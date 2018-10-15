# Evrak İşim (My Document Job) Project (Pisano Hackathon - Team ExbiByte)

This is an app, made in a 25 hour hackathon.


## Pisano Hackathon
*Details of the hackathon can be found in [Pisano Hackathon Website](https://hackathon.pisano.co/)
*If that link is broken or changed check it out from [Archive.is backup of Pisano Hackathon Website](http://archive.is/oVGiI)

## Our Team
4 developers:
* [Halit Ozsoy aka corupta](https://github.com/corupta) as React Native Developer
  ** [Pisano Hackathon React Native Project](https://github.com/corupta/pisano-hackathon-react-native)
* [Mehdi Saffar](https://github.com/MehdiSaffar) as React Developer
  ** [Pisano Hackathon Frontend](https://github.com/MehdiSaffar/pisano-hackathon-frontend)
* [Nazmican Çalık](https://github.com/nazmicancalik) as Express (Node.js) Developer
  ** [Pisano Hackathon Backend](https://github.com/nazmicancalik/pisano-hackathon-backend)
* [Kemal Tulum](https://github.com/kemaltulum) as Project Coordinator/Designer, Angular Developer
  ** [Pisano Hackathon Frontend for Adding Steps](https://github.com/kemaltulum/pisano-exbibyte-frontend)

## Workflow of App

Search for a document,
the app lists you how to get it step by step topologically sorted, considering other document dependencies.

You can navigate to other documents' pages and add & view comments to each document

## Example Workflow

In order to get a passport, you will need your citizenship card, deposit for paying passport fee, etc.
And to get deposit for paying passport, you will need your citizenship card, your photo, and some money.
And to get citizenship card, you need your photo.

In that case, when you search for how to get a passport.
Listed steps are:
1. Photo (Document)
2. Pay for citizenship card (Action)
3. Citizenship Card (Document)
4. Pay for passport fee (Action)
5. Deposit for Paying Passport Fee (Document)
6. Apply for passport (Action)
7. Passport (Document)

## Technical Details

That's a react-native app (Compiles cross-platform to ios/android, tested.)

There are no mixed components, instead each component is separated as view and container and exported via index.
 * Each view component contains view only 
 * Each container component contains logic only and renders the view component.

### Changed from mobx to redux [Related Commit](https://github.com/corupta/pisano-hackathon-react-native/commit/29adc109729ec9f0886ac519bf9a3c0cde938811)

We initially decided use shared mobx for state management in both frontend (react) and app, 
so we used git submodule, and created a new mobx 

But then, found out that the state logic wasn't the same for both web and app. Thus, I decided to separate the state management.
And then, I developed the state management with redux & redux-saga (My personal preference is redux over mobx and I'm more used to using redux)
