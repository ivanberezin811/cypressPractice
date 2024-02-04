pipleline {
    agent {
        doker {
            image 'cypress/base:12'
            //only when running Jenkins locally
            args '-u root:root'
        }
    }
}

stages {
    stage('Download the dependencies') {
        steps {
            sh "npm install"
        }
    }

    stage('Build and test') {
        steps {
            sh "npm run e2e:run:chrome:regression"
        }
    }
}