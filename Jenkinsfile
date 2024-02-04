pipeline {
    agent {
        docker {
            image 'cypress/base:12'
            args '-u root:root'
        }
    }

    stages {
        stage('Download the dependencies') {
            environment {
                HOME="."
            }
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
}

