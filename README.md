
## TV Show Watchlist App

TV Show Watchlist will be a full-stack application where users can post, comment on, and favorite TV shows that they are binging on.

- Users should be able to **add shows** that they watch. These shows are shared on their profile pages.
- Users can view the profile pages of other users and see the shows they are watching.
- Users should be able to **leave comments** on shows. Comments should include the comment's text as well as the username of the user who posted the comment.

## Database Structure

![database schema diagram](./assets/schema_diagram.png)

- **users**
  - id
  - username - _Unique_
  - avatar_url 

- **genres**
  - id
  - genre_name - _Unique_

- **shows**
  - id
  - title
  - img_url
  - genre_id - _References Genres_

- **users_shows** 
  - id
  - user_id - _References Users_
  - show_id - _References Shows_

- **comments**
  - id
  - comment_body
  - user_id - _References Users_
  - show_id - _References Shows_

>  [seed.sql](/seed.sql) file.

## API Endpoints



- **Users**

  | Method | Endpoint     | Description           | Properties sent in JSON body |
  | ------ | ------------ | --------------------- | ---------------------------- |
  | GET    | `/users`     | Get all users         | n/a                          |
  | GET    | `/users/:id` | Get single user by id | n/a                          |
  | POST   | `/users`     | Add new user          | `avatar_url`, `username`     |

- **Genres**

  | Method | Endpoint  | Description    | Properties sent in JSON body |
  | ------ | --------- | -------------- | ---------------------------- |
  | GET    | `/genres` | Get all genres | n/a                          |
  | POST   | `/genres` | Add new genre  | `genre_name`                 |

- **Shows**

  | Method | Endpoint                 | Description                         | Properties sent in JSON body              |
  | ------ | ------------------------ | ----------------------------------- | ----------------------------------------- |
  | GET    | `/shows`                 | Get all shows                       | n/a                                       |
  | GET    | `/shows/:id`             | Get single show by id               | n/a                                       |
  | POST   | `/shows`                 | Add new show                        | `title`, `img_url`, `user_id`, `genre_id` |
  | GET    | `/shows/genre/:genre_id` | Get all shows for specific genre_id | n/a                                       |
  | GET    | `/shows/user/:user_id`   | Get all shows for specific user_id  | n/a                                       |

- **Comments**

  | Method | Endpoint                  | Description                           | Properties sent in JSON body         |
  | ------ | ------------------------- | ------------------------------------- | ------------------------------------ |
  | GET    | `/comments/show/:show_id` | Get all comments for specific show_id | n/a                                  |
  | POST   | `/comments`               | Add new comment                       | `comment_body`, `user_id`, `show_id` |



## Frontend

### Routes
| Route        | Feature                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`          | Home route. Should display a banner image, navbar with links, and message welcoming the user to the app.                                                                                                                                                                                                                                                                                                                                                                            |
| `/users`     | Shows master list of all users. Shows the "logged in" user. Should be able to click on each username linking to the user profile page.                                                                                                                                                                                                                                                                                                                                              |
| `/users/:id` | User profile page. Shows all the shows the user is watching. Must show the image, title, genre for each show. Users should be able to click on the show and take you to the show page.                                                                                                                                                                                                                                                                                              |
| `/shows`     | Masterlist of all the shows. For each show list all the users who are watching. Clicking on the name of the user takes you to that specific users profile page.                                                                                                                                                                                                                                                                                                                     |
| `/shows/add` | Displays two forms. The **Start watching show** form has a drop down list of all the shows in the app for the user to start watching a show that is already in our database. The **Add a new show** form lets the user add a completely new show specifying image url, name and genre (dropdown list). The all-shows and genre drop down lists should reflect the genres and shows that are in the database. The user will automatically start watching a new show they have added. |
| `/shows/:id` | A specific show's profile page. Shows the title, image, genre, number of comments and list of comments. Allows you to add new comments. The comment should be reflected immediately on the list without needing to refresh the page when a new comments is added.                                                                                                                                                                                                                   |
| `/about`     | Shows short description of what this app is about and who made it                                                                                                                                                                                                                                                                                                                                                                                                                   |

### Wireframes 
Find wireframes [here](./assets/TV%20Watchlist%20App%20Wireframes.pdf).






