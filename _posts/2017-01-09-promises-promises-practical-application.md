---
layout: post
title: Promises, Promises Pt. 5
subtitle: Practical Application - All the King’s Horses
thumb_url: chess-thumb.jpeg
bg_url: chess-bg.jpeg
tags: [Promises, JavaScript]
---

<p class='lead'>You know, there’s this one thing that has always driven me crazy about blogs.</p>

You see, too often, whenever they explain how to do something, they’ll give you the basics. They step through “Hello, World”, and that’s it. But you find yourself wanting to do something more complicated, and you find yourself flitting through twenty “Hello, World” tutorials hoping to find more insight. As a musician, I can say that it’s one thing to learn musical scales, but it’s quite another thing to know songs in those scales or when it’s the right time to use them. With this post, I want to go a couple steps further. Promises are a great tool, but their purpose is to solve problems, not just get you past interviews (or provide cheap blog post fodder).

<!--more-->

In the last few blog posts, I’ve laid out all the tools used to construct promises together, but now I want to show you some real-world problems and how I put together promises to deliver the goods, no matter the complication. I’ll start with this common problem: composing objects from different API calls.

## All the King’s Horses and All the King’s Men

When I was at 3AG Systems, I created a technical assessment to judge which contractors we would work with. The following challenge was question number 1. I gave three points if their solution worked, but a lot of them would write a lot of variables to the local scope instead of constructing a promise. The ones who wrote the following got 5 points. 

I don’t know how familiar you are with the idea of RESTful APIs, but in large strokes, your API is just a reflection of your business objects. If you had a bunch of users which could be assigned to groups, you might have API endpoints like the ones below:

* `domain.com/api/users/` – returns all the user objects
* `domain.com/api/users/U1234` – returns the user object with ID U1234
* `domain.com/api/users/U1234/groups` – returns an array of group data for user U1234
* `domain.com/api/groups/` – returns all the group objects
* `domain.com/api/groups/G1234` – returns the group object with ID G1234

Let’s say that a call to /api/users/U1234 returns the following object:

```json
{
  "userId" : "U1234",
  "name" : "Jon Snow",
  "rank" : "Lord Commander",
  "groupIds" : ["G1234", "G2345", "G3456"]
}
```

The group data at /api/groups/G1234 might look like this:

```json
{
  "groupId" : "G1234",
  "name" : "Night’s Watch Fencing Club"
}
```

In this challenge, we have a UI that requires an object that has everything you’d get from the user object plus an array of group objects called “groups”. That means we have two requests to combine. Since we know how to chain promises, we can do this pretty simply:

```javascript
function getUserWithGroups(userId){
  // Make a call to the users api
  return getUser(userId)
    .then(user => 
      // Make a call to the users api groups
      getGroupsByUser(userId)
        .then(groups => ({groups, ...user}));
    });
}

// get the user from the API
function getUser(userId){
  return axios.get(`/api/users/${userId}`)
    .then(results => results.data);
}

// get the groups for a specific user from the API
function getGroupsByUser(userId){
  return axios.get(`/api/users/${userId}/groups`)
    .then(results => results.data);
}
```

That’s one way to do it, of course, but in this case, there’s no reason to send one call and wait for it to finish before sending the next. After all, the second call doesn’t need any new information from the first call. Let’s use `Promise.all()` to combine them together.

```javascript
function getUserWithGroups(userId){
  // Make the call to get the user and its groups
  const userPromise = getUser(userId);
  const groupsPromise = getGroupsByUser(userId);

  // Combine them
  return Promise.all([userPromise, groupsPromise])
    .then(([user, groups]) => ({groups, ...user}))
}
```

## Which Would Be Great, But...

Let’s say for a moment that you’re at an early stage of developing the API. You’ve used some scaffolding program to create your API methods, but you’d have to write out that `user/{userId}/groups` method out longhand, and you haven’t done that. What you have done is scaffold out your Groups API, and you can make a call to `/api/groups/{groupID}` to get the same information. What then?

Well, we’re going to combine the two solutions above to make something new. We know that the user data will include a list of groupIds, so let’s pretend that there’s a function called `getGroups(groupIds)` that takes in an array of groupIds and returns a promise that resolves with an array of group objects. We’ll have to call it once we have the groupIds, so let’s chain them.

```javascript
function getUserWithGroups(userId){
  // Make a call to the users api
  return getUser(userId)
    .then(user => 
      getGroups(user.groupIds)
        .then(groups => 
          ({groups, ...user})));
}
```

Easy switch, but what does `getGroups(groupIds)` look like? We know we have to make an API request for every group, then once they’re all done, return one big array that contains everything. So, let’s use `Promise.all` to combine all of those requests into one big promise!

```javascript
function getGroups(groupIds){
  const groupPromises = groupIds.map(getGroup);
  return Promise.all(groupPromises);
}

// get a group by ID from the API
function getGroup(groupId){
  return axios.get(`/api/groups/${groupId}`)
    .then(results => results.data);
}
```

## And One Last Hiccup...

While this code works in the ideal situations, it’s not perfect. I’ve found that the hardest part of depending on `Promise.all()` is that you can’t always trust your API calls. What if, for some reason, some of those groups can’t be shown to the user? What if some of them are simply defunct? I had this problem, and the decision was to wait for them all to return, but only show the successful items. Here was my solution to that:

```javascript
function getGroups(groupIds){
  // get a set of always-resolving promises
  const groupPromises = groupIds.map(groupId => 
    getGroup(groupId).catch(() => undefined));
  
  return Promise.all(groupPromises)
    .then(groups => groups.filter(group => group !== undefined));
}
```

Now, this is safe. If the user call throws an error, the final promise will reject. If any (or all) of the group calls reject, this thing will still work, and since you have the original array of groupIds, you can compare the two arrays to determine what’s missing. The techniques in this post will help you face a lot of async challenges, but I do want to keep going. In the following posts, I’ll cover recursion and how I use promises to do work behind the scenes without disrupting the user experience.