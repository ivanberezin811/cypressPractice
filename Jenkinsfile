pipeline {
    agent {
        docker {
            image 'cypress/base:latest'
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

        stage('Run test') {
            steps {
                sh "npm run e2e:run:cypress:dashboard"
            }
        }
    }
}

