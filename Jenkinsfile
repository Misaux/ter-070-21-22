pipeline {
    agent any
    stages {
        stage('build') {
            steps {
                sh 'chmod +x -R /var/lib/jenkins/workspace'
                sh './build.sh'
            }
        }
    }
}