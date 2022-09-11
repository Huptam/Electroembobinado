<p align="center">
    <h1 align="center">Project Electroembobinado (not completed)</h1>
</p>

Simple CRUD in Node.js with [Handlebars](https://handlebarsjs.com/).

Integrantes: Deimer Hernandez, Efrain Vega, Moisés Payares

2020

## Installation

### Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

For system requirements you [About | Node.js](https://nodejs.org/en/about/)

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

### Clone the repository from github.

    git clone https://github.com/Huptam/Electroembobinado [YourDirectoryName]

The command installs the project in a directory named `YourDirectoryName`. You can choose a different
directory name if you want.

### Database

1. Import the script winch is locate in 'src/database'.

### Install Node Dependencies

1. `npm install` to install node dependencies

### Create storage link

`php artisan storage:link`

### Run Server

1. `npm start` to run server 
2. Visit `http://localhost:4000/` in your browser. Create an account first and login.
  (user: 2647899 - password: 1234567)

### Screenshots

#### Login

![Login Page](https://raw.githubusercontent.com/Huptam/Electroembobinado/master/screenshot/login.png)

#### Dashboard

![Dashboard Page](https://github.com/Huptam/Electroembobinado/blob/master/screenshot/dashboard_motores.png)

#### Add Motores

![Add Motres Page](https://raw.githubusercontent.com/Huptam/Electroembobinado/master/screenshot/agregarnuevomotor.png)
