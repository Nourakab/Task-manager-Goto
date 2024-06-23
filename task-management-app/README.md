# Task Management Application

## Table of Contents

- [Introduction](#introduction)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Cloning the Repository](#cloning-the-repository)
  - [Installing Dependencies](#installing-dependencies)
  - [Setting Up Environment Variables](#setting-up-environment-variables)
- [Running the Project](#running-the-project)
- [Running Unit Tests](#running-unit-tests)
- [Assumptions and Limitations](#assumptions-and-limitations)
  - [Assumptions](#assumptions)
  - [Limitations](#limitations)
- [Code Structure and Design Choices](#code-structure-and-design-choices)
  - [Code Structure](#code-structure)
  - [Design Choices](#design-choices)
  - [Components](#components)
  - [Context](#context)

## Introduction

This is a Task Management Application built using React, Vite, and Jest for unit testing. The application allows users to create, edit, and manage tasks with different statuses and roles.

## Setup Instructions

### Prerequisites

- Node.js (version 14 or later)
- npm (version 6 or later)

### Cloning the Repository

To clone the repository, run the following command in your terminal:

````bash
git clone https://github.com/your-username/task-management-app.git

## Installing Dependencies
Navigate to the project directory and install the necessary dependencies:
cd task-management-app
npm install

## Setting Up Environment Variables
Create a .env file in the root directory of the project and add the following environment variables:

env
Copy code
VITE_USER_0_NAME=Owner 0
VITE_USER_0_ROLE=Owner
VITE_USER_0_EMAIL=owner0@example.com
VITE_USER_0_PASSWORD=OwnerPass1!
VITE_USER_0_AVATAR=/src/assets/images/owner0.jpg

VITE_USER_1_NAME=Owner 1
VITE_USER_1_ROLE=Owner
VITE_USER_1_EMAIL=owner1@example.com
VITE_USER_1_PASSWORD=OwnerPass1!
VITE_USER_1_AVATAR=/src/assets/images/owner1.jpg

VITE_USER_2_NAME=Owner 2
VITE_USER_2_ROLE=Owner
VITE_USER_2_EMAIL=owner2@example.com
VITE_USER_2_PASSWORD=OwnerPass2!
VITE_USER_2_AVATAR=/src/assets/images/owner2.jpg

VITE_USER_3_NAME=Owner 3
VITE_USER_3_ROLE=Owner
VITE_USER_3_EMAIL=owner3@example.com
VITE_USER_3_PASSWORD=OwnerPass3!
VITE_USER_3_AVATAR=/src/assets/images/owner3.jpg

VITE_USER_4_NAME=Admin User
VITE_USER_4_ROLE=Admin
VITE_USER_4_EMAIL=admin@example.com
VITE_USER_4_PASSWORD=AdminPass1234&
VITE_USER_4_AVATAR=/src/assets/images/admin.jpg

## Running the Project
To start the development server, run the following command:
npm run dev

This will start the Vite development server and you can view the application by navigating to http://localhost:3000 in your web browser.


## Running Unit Tests

To run the unit tests, use the following command:

```bash
npm test
````

This will execute the tests using Jest and display the results in the terminal.

##Assumptions and Limitations

## Assumptions

The application assumes that the user roles are predefined and consist of "Admin" and "Owner".
Tasks have predefined statuses such as "Pending" and "Overdue".

## Limitations

The current implementation does not include persistent storage, so tasks will not be saved after a page refresh.
The application does not support multiple languages.
The UI is designed primarily for desktop view and may not be fully responsive on mobile devices.

# Code Structure and Design Choices

## Code Structure

The project follows a modular structure, with each component and utility function placed in appropriate directories:

src/components: Contains all the reusable React components.
src/context: Contains the context provider for managing global state.
src/pages: Contains the main page components.
src/assets: Contains static assets like images and CSS files.
src/**tests**: Contains the unit tests for the components.

## Design Choices

React with Vite: Vite was chosen for its fast development server and optimized build process.
Context API: Used for managing global state such as user information and tasks, avoiding prop drilling.
CSS: Used for consistent and responsive UI components.
Jest and React Testing Library: Used for unit testing to ensure the reliability of the components.

## Components

TaskForm: A form component for creating and editing tasks.
TaskCard: A card component for displaying individual tasks.
UserProfile: A component for displaying and managing user profile information.
TaskPage: The main page component that brings together all other components.
Login: A page to login to the application and view the tasks by user.

## Context

TaskContext: Provides global state management for tasks and user information.

This structured format should help users understand how to set up, run, and test the project effectively. It also provides clear information on the project's structure and design choices.
