# Question Box React application

## Instructions

Your project will be to create a front-end application using React. This application will be a question and answer platform, not unlike Stack Overflow in format, although you can design and style it as you like. This application should allow logged-in users to ask questions, give and receive answers, and mark an answer as valid. Users that are not logged in should still be able to view the site, just not ask questions, give answers, or mark answers as valid.

### Collaborating

You will be paired with a team of back-end developers that will build an API for your application. Your first order of business should be communicating with them about the structure and content of the data their application will serve and your application will need.

While the API is being built, you may need to have a fake version of it in order to build the front-end. A few recommendations:

1. You can do a lot of work without the API in place by using Storybook and building components with data you give to them.
2. If you need a fake version of the API, take a look at [Mocky](https://www.mocky.io/) and [MockAPI](https://www.mockapi.io/).

### Specific list of features

* Users should be able to create an account.
* Users should be able to log in.
* Authenticated users should be able to ask a question.
* Authenticated users should be able to answer a question.
* Authenticated users can choose a valid answer among the answers to one of their questions.
* Authenticated users have a profile page that lists all their questions and answers.
* The list of questions that comes back from the API may be paginated. If so, you must implement pagination in your application.
* Markdown is used throughout the application for entering text. Check with your API authors for how they want to handle this. If you receive Markdown from the API, you will need to render it as HTML on the front-end. Suggested libraries are [Showdown](http://showdownjs.com/) or [Marked](https://marked.js.org/#/README.md).
* You will have to route some URLs.
  * Login and registration should each have a URL, or one for both if they are in the same view.
  * Questions should have their own route.
  * User profiles should have their own route.
  * If implementing pagination, you will likely use routes to implement this.

