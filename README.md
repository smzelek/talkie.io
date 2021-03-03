# Talkie.io

## Requirements
Running the app requires `docker` and `docker-compose`.

Docker:
~~~
$ docker version
Client: Docker Engine - Community
 Cloud integration: 1.0.7
 Version:           20.10.2
 API version:       1.41
 Go version:        go1.13.15
 Git commit:        2291f61
 Built:             Mon Dec 28 16:14:16 2020   
 OS/Arch:           windows/amd64
 Context:           default
 Experimental:      true
~~~

Docker Compose:
~~~
$ docker-compose version
docker-compose version 1.27.4, build 40524192
docker-py version: 4.3.1
CPython version: 3.7.4
OpenSSL version: OpenSSL 1.1.1c  28 May 2019
~~~

If those are installed, use `npm start` to run the app:
```shell
$ npm start

docker-compose down -v && docker-compose build && docker-compose up --remove-orphans
...
    docker starts up...
...
dependencies_1  | talkieio_dependencies_1 exited with code 0
server_1        | ⚡️[server]: Server is running at http://0.0.0.0:8000
webapp_1        | ℹ ｢wds｣: Project is running at http://0.0.0.0:8080/
```

Then browse to http://localhost:8080/login to check out the application.  
You can also access the backend routes under http://localhost:8000.  
You can view the MongoDB with a tool like [MongoDB Compass](https://www.mongodb.com/try/download/compass) at `mongodb://localhost:27017/talkieio`.