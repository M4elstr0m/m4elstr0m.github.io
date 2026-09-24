port := "4321"

dev-start:
    nohup npm run dev -- --port {{port}} > .dev.log 2>&1 &

dev-stop:
    fuser -k {{port}}/tcp
