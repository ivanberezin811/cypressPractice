pipleline {
    agent {
        doker {
            image 'cypress/base:12'
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