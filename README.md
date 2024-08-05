# emergency_waitlist
## Running the application
### Developers' perspective
1. Ensure postgres is installed
2. Create a db in postgres (I created it in pgadmin4 and named the db emergency_waitlist). You can do this by opening pgadmin4 right click where it says databases, then create database and name it whatever you want (I used emergency_waitlist).
3. Run the schema.sql to create the schema in postgres. I used datagrip to connect to the postgres db and ran the schema.sql file. You can also use pgadmin4 by going into the db > public > right-click tables and click the query tool. You can copy and paste the queries from schema.sql in here and run it to create the schema.
4. In the seed.sql run all the sql queries in order. I used datagrip (once connected to the db select all lines in the seed.sql file and click run). You can also use pgadmin4 by copy pasting the sql into the query tool from last step and run the new queries by selecting them.
5. Make sure to change the connection string to your preference matching your postgres db on **_line 10 in public/index.php_**
6. In a terminal tab opened in the public directory run `php -S localhost:8888` to start the php server
### User Perspective
Ensure the steps from the developer have been run already.
#### Patient
1. visit [http://localhost:8888/](http://localhost:8888/) (replace 8888 with whatever port you ran the php server on)
2. Enter a patient that is in the queues information as prompted. For example, one of the users from the seeding is Firstname: Tre, lastname: white, code: 123.
#### Admin
1. Visit [http://localhost:8888/administrator/login](http://localhost:8888/administrator/login) (replace 8888 with whatever port you ran the php server on)
2. Enter a valid admin login. An example is username: admin, password: admin.
3. You will be redirected to [http://localhost:8888/administrator/dashboard](http://localhost:8888/administrator/dashboard) where you can see the queue in order, admit patients by clicking the button in their row, and add new patients by filling the form. Note it is assumed that multiple patients can have the same first and last name (as they have a unique integer id assigned to them). 
 
