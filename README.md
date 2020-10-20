# SocialViz

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.12.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Tutorial

### Pre-loaded mock data

The app is pre-loaded with 20 mock data for visualization purpose

### Add new record

Click the "ADD RECORD" button on the top left corner to open the form

### Fill out the form

- Name, Age, and Weight are required fields. Age and Weight require number only. The Friend fields are not required.
- Click "Add Friend" button to add a new Friend field.
- Click "Reset" button to clear the form and reset to one Friend field.
- Click "Submit" button to submit the form. The data will be recorded in the store and reflected on the visualizations.

### Visualization
- Overview items: view total number of records, total people involved, average age and weight of the people on record.
- Force directed graph: a network graph represent the friends relationships in the data. The blue dots represent the people on record. The smaller grey dots represent those who are friend only.
- Age vs. weight scatterplot: a scatterplot to analyze the relationship between age and weight of the people on record.
- Age and weight distribution histograms: view the distribution of the age and weight data.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
