@Library("ogtl-build@dev") _

Microservice(
        type: 'node',
        repo: 'possap-backend',
        deployment: 'possap-backend',
        image_repository: 'possap-backend',
        publiclyAccessible: true,
        devFlags: "--set autoscaling.enabled=false \
        --set volume.secondVolume.enabled=false \
        --set volume.mountPath=/usr/src/app/.env \
        --set resources.requests.memory=800Mi \
        --set resources.requests.cpu=800m \
        --set resources.limits.cpu=1000m \
        --set resources.limits.memory=2048Mi \
        --set ingress.enabled=true \
        --set hostNamePrefix=possapbackend-development \
        --set secretObjects.secretName=possapbackend-dev \
        --set probes.readinessProbe.enabled=false \
        --set probes.livenessProbe.enabled=false \
        --set PersistentVolumeClaim.enabled=false \
        --set serviceAccount.name=secret-store",
        commonFlags: "--set image.port=3000 \
        --set cron.enabled=false \
        --set service.type=NodePort"
    )
