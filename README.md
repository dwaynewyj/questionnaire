# Questionnaire

## Overview

This project is designed to complete the front-end coding assignment for Smile Digital Health. The goal is to create a dynamic questionnaire view using the Angular framework, which captures answers to specific health-related questions. The form should be validated using the provided questionnaire.json.


- Author: Dwayne Jang
- Created: 202407051800
- Updated: 202407052125
- 
## Features

- **Responsive Layout**: Ensures seamless usability across various devices, adapting fluidly to different screen sizes.
  
- **Dynamic Form Generation**: Implements dynamic form creation and validation based on JSON schemas.
  
- **Angular Integration**: Utilizes Angular 18 to adhere to FHIR questionnaire standards and specifications.
  
- **Angular Material**: Enhances user interface with Angular Material, ensuring a consistent and modern design approach.

## Technical Notes

- Three primary cards are displayed on the screen:
  1. **Standard JSON Questionnaire**: Provides navigation to the solution for standard JSON questionnaires.
  2. **Nested JSON Questionnaire**: Offers access to the solution for nested JSON questionnaires from hl7.org.
  3. **Source and References**: Links to Dwayne's GitHub repository for additional sources and references.
## Setup Instructions

1. **Clone the Repository**: 
    ```bash
    git clone https://github.com/dwaynewyj/questionnaire
    cd questionnaire
    ```

2. **Install Dependencies**:
    ```bash
    cd fe
    npm install
    ```

3. **Test the Application**:
    ```bash
    ng test
    ```

4. **Run the Web Application**:
    ```bash
    ng serve
    ```

5. **Open in Browser**:
    - Navigate to `http://localhost:4200/` in your browser to view the application.

## Evaluation Criteria

- **Proficiency in Angular**: The application should demonstrate a solid understanding of Angular framework principles and best practices.
  
- **Dynamic Form Generation**: The form should be dynamically generated based on the provided questionnaire.json.

- **Validation and User Experience**: The form should be validated correctly, and the user experience should be smooth and intuitive.

- **Code Quality and Documentation**: The project should have clean, well-structured code with comprehensive documentation, including comments and setup instructions.

- **Problem-solving Abilities**: The ability to handle dynamic form generation and validation challenges should be evident in the implementation.


## Architectural Overview

The architecture of the Angular-React Dashboard is as follows:

- **Angular**: Angular is used as the main framework for the application. It provides the structure for the application, including components, services, and routing. Angular's component-based architecture allows for a clear separation of concerns and reusability.
  
- **Angular Material**: Angular Material is utilized for implementing the UI components such as radio buttons, select dropdowns, date picker, and text box. It ensures a consistent and responsive design across different devices.
  
- **Reactive Forms**: Reactive Forms in Angular are used to handle form validation and data binding. This approach allows for more robust and scalable form handling, especially for dynamic forms.


- **ServicesForms**: A service is used to fetch and manage the questionnaire data from the provided questionnaire.json. This service is responsible for making HTTP requests and providing the data to the components.



- **Questionnaire Component**: The main component that renders the dynamic form based on the questionnaire data. It captures user input and handles form submission.


- **Routing**: Angular Router is used to manage navigation within the application. It ensures that the application can be easily extended with additional views or components as needed.


- **Validation**: The questionnaire.json file is used to validate the behavior of the form. This ensures that the form adheres to the expected structure and data types defined in the JSON file.


### Architecture and Design Principles

- **Modularity**: The application is divided into distinct modules, each responsible for a specific part of the functionality. This makes the application easier to manage, test, and extend.


- **Scalability**: The use of Angular and its modular approach allows the application to scale easily. New features or components can be added without affecting the existing functionality.

- **Maintainability**: By following best practices in Angular development, such as using services for data management and reactive forms for form handling, the codebase is kept clean and maintainable. Regular updates and refactoring can be done with minimal disruption.

- **Potential Extensions**: Further validation rules can be added to ensure the correctness of the user input.

### Potential Trade-offs and Concerns

1. **Dynamic Form Complexity**: Dynamically generating forms based on JSON schema can introduce complexity, especially when dealing with nested structures or conditional logic. This may lead to increased development time and potential bugs.

2. **Performance Overhead**: Handling a large number of form fields or complex validation logic can result in performance overhead. Ensuring smooth performance requires optimization, particularly for large datasets or on lower-end devices.

3. **Learning Curve**: Developers need to be proficient in Angular and familiar with FHIR standards. This may necessitate additional training or resources, posing a challenge for new team members or those less familiar with these technologies.

4. **Validation Complexity**: Ensuring comprehensive validation based on the provided JSON schema can be complex, especially when dealing with custom validation rules or dynamic form elements.

5. **Maintainability**: As the project grows, maintaining a dynamic form structure can become challenging. Changes to the JSON schema or the form structure may require careful coordination and testing to avoid breaking existing functionality.

### Tools to Enhance Integration and Efficiency

1. **Angular Formly**: A library that provides dynamic form generation based on a JSON configuration. It simplifies the creation of complex forms and helps manage dynamic form fields.

2. **AJV (Another JSON Validator)**: A JSON schema validator that can be used to validate the form data against the provided JSON schema. It ensures that the form data adheres to the expected structure and rules.

3. **RxJS for Asynchronous Handling**: Leveraging RxJS for handling asynchronous operations, such as fetching the JSON schema or submitting the form data, can improve code readability and maintainability.

4. **Storybook**: Facilitates UI component development in isolation, allowing for easier integration and ensuring component compatibility.

5. **Linting and Code Formatting**: Tools like ESLint and Prettier help maintain code quality and consistency across the project, enforcing coding standards and best practices.

6. **Angular Material**: Utilizing Angular Material for consistent UI components ensures a responsive design and enhances the user experience across different devices.