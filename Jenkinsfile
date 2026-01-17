pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = 'joel2kc'
        IMAGE_NAME = 'bssrmd'
        IMAGE_TAG = 'latest'
        DOCKER_IMAGE = "${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${IMAGE_TAG}"
        CONTAINER_NAME = 'bssrmd'
        APP_PORT = '8080'
    }

    stages {

        stage('Checkout Source Code') {
            steps {
                echo 'Checking out source code from GitHub...'
                git branch: 'main',
                    url: 'https://github.com/joel2kc/bssrmd.git'
            }
        }

        stage('Build & Test Application') {
            steps {
                echo 'Building and testing application...'

                sh 'npm install'
                sh 'npm test'

                echo 'Build stage completed.'
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker image...'
                sh """
                  docker build -t ${DOCKER_IMAGE} .
                """
            }
        }

        stage('Docker Login') {
            steps {
                echo 'Logging in to Docker Hub...'
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh """
                      echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin
                    """
                }
            }
        }

        stage('Docker Push') {
            steps {
                echo 'Pushing Docker image to Docker Hub...'
                sh """
                  docker push ${DOCKER_IMAGE}
                """
            }
        }

        stage('Deploy to VM') {
            steps {
                echo 'Deploying container to Jenkins VM...'
                sh """
                  docker pull ${DOCKER_IMAGE}

                  if [ \$(docker ps -aq -f name=${CONTAINER_NAME}) ]; then
                      docker stop ${CONTAINER_NAME} || true
                      docker rm ${CONTAINER_NAME} || true
                  fi

                  docker run -d \\
                    --name ${CONTAINER_NAME} \\
                    -p ${APP_PORT}:${APP_PORT} \\
                    --restart unless-stopped \\
                    ${DOCKER_IMAGE}
                """
            }
        }
    }

    post {
        success {
            echo '✅ BSSRMD CI/CD pipeline completed successfully'
        }
        failure {
            echo '❌ BSSRMD pipeline failed'
        }
        always {
            sh 'docker logout || true'
        }
    }
}
