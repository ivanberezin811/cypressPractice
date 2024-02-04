pipeline {
    agent {
        docker {
            image 'cypress/base:18.11.0'
            args '-u root:root'
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
}

