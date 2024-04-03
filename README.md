# Dynamic Form Builder Example

#### Live Site: [https://mikeymanoguerra.github.io/dynamic-form-builder/](https://mikeymanoguerra.github.io/dynamic-form-builder/)


### What is it?
This is an example repository showing how to dynamically inject custom input components into a Reactive Form. This allows for rendering of forms defined by a data source without a switch case in the template.

### How does it work?
The application defines a custom model for a Form, which has a collection of Questions, another custom model. The critical key on the Question model is `type`, which is mapped to the custom input components via `dynamic-input.directive.ts` that the application supports in `components/inputs`. When the application renders a form, it loops over the model questions in the data and renders the requisite custom component. 

### How does one use this example application?
There is a predefined list of forms on the home page, which can be filled out on page load. A user can also test creating their own form, or editing one of the existing forms. Questions can be added to a question library, so common questions can be used across forms. The application state is saved in localstorage, so a user can edit example forms across sessions.

### What is next?
- Provide more question customization to the user: placeholder text, help text
- render error text in real time under inputs
- allow access to validators in inputs (see note in `dynamic-input.directive.ts`)
- Force uniqueness in library question slugs
- ...
