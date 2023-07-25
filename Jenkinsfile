@Library("ogtl-build@dev") _

Microservice(
        type: 'node',
        repo: 'possap-backend',
        deployment: 'possap-backend',
        image_repository: 'possap-backend',
        publiclyAccessible: true,
        devFlags: "--set autoscaling.enabled=false \
        --set volume.secondVolume.enabled=false \
        --set cron.enabled=false \
        --set volume.mountPath=/usr/src/app/.env \
        --set serviceAccount.name=secret-store",
        commonFlags: "--set image.port=3000 \
        --set resources.requests.memory=500Mi \
        --set resources.requests.cpu=250m \
        --set resources.limits.cpu=500 \
        --set resources.limits.memory=2048Mi \
        --set ingress.enabled=true \
        --set hostNamePrefix=possapbackend-development \
        --set secretObjects.secretName=possapbackend-dev \
        --set probes.readinessProbe.enabled=false \
        --set probes.livenessProbe.enabled=false \
        --set PersistentVolumeClaim.enabled=false \
        --set service.type=NodePort"

    )
