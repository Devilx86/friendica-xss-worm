# Overview
This repository contains an XSS worm for Friendica 2024.03. The worm exploits one of the three issues reported [here](https://github.com/friendica/friendica/issues/14220) ([CVE-2024-39094](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2024-39094)) to perform the Samy is my hero attack.

# Setup
- Git clone the repository and change the directory to the repository folder using `cd friendica-xss-worm`.
- Setup MariaDB container with the following command:
`sudo docker run -e MYSQL_ROOT_PASSWORD=password -d -v mysql-vol-1:/var/lib/mysql -p 3333:3306 mariadb`.
- Connect to the DB with the command `mysql -h 172.17.0.1 -P 3333 -u root -p` and password `password` (find the IP of the mariadb container).
- Execute the SQL Query `Create database friendicadb;`.
- Run the vulnerable Friendica image with the command `sudo docker run -d -p 8888:80 friendica:2024.03`.
- Visit `http://localhost:8888` and complete the installation.

# Running the exploit
- Register and create 2 user accounts on friendica.
- Modify `payload.js` as commented in the file with the attacker username in the `followUser` variable.
- `cd` to the same directory as `payload.js` and run a php webserver with the command `sudo php -S localhost:8886`.
- Login to one of the user accounts on behalf of the attacker and browse to the `Edit profile page` > `Miscellaneous` section.
- Copy the contents of `init.js` file and paste it as the value of eitheir `homepage`, `xmpp` or `matrix` field in the attackers profile.
- Now visit the attackers profile page located at `http://<domain>/profile/<Attacker_Username>` as a different user.
- This will trigger the XSS payload, now check the profile of the current user. Notice that the payload has been spread to the current users profile along with an updated bio. The user also now follows the attacker just like the Samy is my hero attack.
