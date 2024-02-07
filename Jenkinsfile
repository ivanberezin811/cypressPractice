pipeline {
    agent {
        docker {
            image 'cypress/base:latest'
            args '-e HOME=/tmp -e NPM_CONFIG_PREFIX=/tmp/.npm'
        }
    }

    stages {
        stage('Download the dependencies') {
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

