# Syncfusion Gantt with CRUD

This project is a JS Syncfusion Gantt application with a server for performing CRUD operations.

## Getting Started

To get started you need to clone the repository and navigate into the folder.

```
git clone https://github.com/bryntum/syncfusion-gantt-starter syncfusion-gantt
cd syncfusion-gantt
```

## Installing

We already configure the required packages in the `package.json` file.

You can run the below command to install all dependent packages related to this project.

```
npm install
```

## License Key

You need a license key from Syncfusion to initialize the project. Fist sign in to [Synfusion]() then navigate to [this page](https://www.syncfusion.com/account/manage-trials/downloads), and click the "Get License Key" button.

Once you have your license key, swap out the `'<your-license-key>'` string in `src/app.ts` with your license key.

## Setting up the Database

In the `server.js` file, the Express server uses the MySQL2 library to connect to MySQL and run queries.

Create a .env file in the root folder and add the following lines for connecting to the MySQL database that we’ll create:

```bash
DB_HOST='localhost'
DB_USER='root'
DB_PASSWORD='<your-password>'
DB_DATABASE='syncfusion'
```

Don’t forget to add the root password for your MySQL server.

We’ll install MySQL Server and MySQL Workbench. MySQL Workbench is a MySQL GUI that we’ll use to create a database with tables for the Gantt data and to run queries. Download MySQL Server and MySQL Workbench from the MySQL community downloads page. If you’re using Windows, you can use the MySQL Installer to download the MySQL products. Use the default configurations when configuring MySQL Server and Workbench. Make sure that you configure the MySQL Server to start at system startup for convenience.

Open the MySQL Workbench desktop application. Open the local instance of the MySQL Server that you configured.

We’ll write our MySQL queries in the query tab and execute the queries by pressing the yellow lightning bolt button.

Creating a MySQL database for the Syncfusion data: Adding a table and adding example data.

Let’s run some MySQL queries in MySQL Workbench to create, use, and populate a database for our Syncfusion Gantt. Execute the following query to create a database called `syncfusion`:

```sql
CREATE DATABASE syncfusion;
```

Run the following query so that we set our newly created database for use:

```sql
USE syncfusion;
```

Let’s create the table that we’ll need for our Syncfusion Gantt chart data:

```sql
CREATE TABLE `syncTasks` (
    `TaskID` int NOT NULL,
    `TaskName` varchar(255) DEFAULT NULL,
    `StartDate` date DEFAULT NULL,
    `EndDate` date DEFAULT NULL,
    `Duration` int DEFAULT NULL,
    `Progress` int DEFAULT NULL,
    `ParentID` int DEFAULT NULL,
    `Predecessor` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`TaskID`));
```

Now add some example tasks data to the `syncTasks` table:

```sql
INSERT INTO `syncTasks` VALUES ('1', 'Project #1', '2019-04-01', '2019-04-30', '22', '37', NULL, NULL);
INSERT INTO `syncTasks` VALUES ('2', 'Task #1', '2019-04-01', '2019-04-30', '22', '22', '1', NULL);
INSERT INTO `syncTasks` VALUES ('3', 'Task #1.1', '2019-04-01', '2019-04-12', '10', '50', '2', NULL);
INSERT INTO `syncTasks` VALUES ('4', 'Task #1.2', '2019-04-15', '2019-04-30', '12', '0', '2', '3 FS');
INSERT INTO `syncTasks` VALUES ('5', 'Task #2', '2019-04-01', '2019-04-29', '21', '53', '1', NULL);
INSERT INTO `syncTasks` VALUES ('6', 'Task #2.1', '2019-04-01', '2019-04-12', '10', '90', '5', '');
INSERT INTO `syncTasks` VALUES ('7', 'Task #2.2', '2019-04-15', '2019-04-29', '11', '21', '5', '6 FS');
INSERT INTO `syncTasks` VALUES ('8', 'Task #3', '2019-04-01', '2019-04-08', '6', '0', '1', NULL);
```

You’ll be able to view the example tasks data by running the following query:

```sql
SELECT * FROM syncTasks;
```

## Running

```
node server.js
```

We have to install WebDriver and also need to ensure it is updated. Open a separate terminal and run the below npm script.

```
npm run update-webdriver
```

Open another terminal and run the below npm script. It will start web server to serve our application.

```
npm run serve
```

The application is configured with `browser-sync`, so it will serve the web application in your default browser.

`SystemJS` is used for module loading.

You can use the below npm script to run the web application.

```
npm run start
```

You should see your Syncfusion Gantt chart with the tasks we populated our MySQL database with.

## Resources

You can also refer the below resources to know more details about Syncfusion's JS 2 Gantt components.

- [Pure JS Demos](http://ej2.syncfusion.com/demos/)
- [Pure JS Documentation](http://ej2.syncfusion.com/documentation/)
