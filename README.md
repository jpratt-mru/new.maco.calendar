# MACO Schedule Calendar Tool Notes

## Framework

- React 16+
- [Parcel](https://parceljs.org/) for bundling, because learned about it in FrontEndMasters [Complete Intro to React v4](https://frontendmasters.com/courses/complete-react-v4/) and it's a ton simpler than Webpack.
- CSS stuffs through Google's [Material Design Light](https://getmdl.io), because I didn't want to spend a ton of time on design but still wanted things to look professional.

## Deployment

I'm hosting (at least for the time being) through Google's Firebase Hosting.

If I'm on my dev machine (the **maco.calendar.app.v1** one on Digital Ocean), then it's just a matter of going `firebase deploy` from the project directory.

What I have currently in my package.json to do the deploy is

```
    "build": "parcel build public/index.html --public-url ./"
```
