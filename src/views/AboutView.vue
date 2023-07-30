<template>
  <div class="about container">
    <h1>Component-Based Development of Complex Applications</h1>
    <h2 class="sub-title">University Project at HTW Berlin</h2>
    <p>Welcome to the About page of our university project at the University of Applied Sciences (HTW) Berlin! Our project team consists of three dedicated students: Bastian Schneider, Rengbar Hardam, and Enno Davis.</p>
    <h3>Our Mission</h3>
    <p>As part of our university project, we focused on developing an innovative application using a component-based architecture. Our goal was to design an effective and user-friendly vocabulary trainer that incorporates the gameplay of the popular app Quizduell into the vocabulary learning experience.</p>
    <h3>The Challenge</h3>
    <p>Task sheet 1 required us to familiarize ourselves with the functionality of an (online) vocabulary trainer system and design a component-based architecture for our vocabulary trainer. We started by creating a data model and defining the necessary operations. Particularly exciting was the conception of a component that integrates Quizduell's entertaining gameplay into our vocabulary trainer. As a result of this task, we successfully achieved the following outcomes:</p>
    <ul>
      <li>A data model in the form of diagrams and Java classes</li>
      <li>A component diagram</li>
      <li>Interface definitions in Java with Javadoc, with each component having its own Maven project</li>
    </ul>
    <h3>The Implementation</h3>
    <p>Task sheet 2 challenged us to implement the functionality of our components and interfaces in separate Maven modules. To streamline the configuration, we opted for Dependency Injection (DI).
      <br>In addition, we supplemented our test cases for the components with import interfaces and used a mock framework to facilitate Stubbing and Verifying.
      <br>For the persistence of our data model, we chose the Java Persistence API (JPA) and selected a suitable JPA provider. We implemented controlled transaction management using the Data Access Object (DAO) pattern.</p>
    <h3>On the Path to Completion</h3>
    <p>Task sheet 3 focused on error handling and multi-user operation of our application. Here, we developed a robust error handling mechanism that aligned with the specific requirements of the component-based architecture. We differentiated between technical errors and application errors, and handled exceptional situations separately from allowed return values.
      <br>The most significant expansion was transforming our vocabulary trainer into a fully-fledged multi-user application. To achieve this, we enabled multiple clients to access our online vocabulary trainer via a REST interface. To ensure efficient communication between clients and the server, we implemented the Adapter pattern for the REST interface.</p>
    <h3>The Future</h3>
    <p>We take pride in the results of our collaboration and look forward to successfully completing this project. Thank you for your interest in our university project at HTW Berlin!
      <br>If you have any questions or suggestions, please feel free to reach out to us:</p>
    <ul>
      <li>Bastian Schneider: S0584156, Bastian.Schneider@Student.HTW-Berlin.de</li>
      <li>Rengbar Hardam: S0579616, Rengbar.Hardam@Student.HTW-Berlin.de</li>
      <li>Enno Davis: S0585748, Enno.Davis@Student.HTW-Berlin.de</li>
    </ul>
    <p>Note: This project was created as part of a university project at HTW Berlin and is not intended for commercial purposes.</p>
  </div>
</template>


<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
}

.about {
  margin: 3rem auto;
}

.sub-title {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>
<script setup>
</script>