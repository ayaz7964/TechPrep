const fs = require('fs');

function codeBlock(lines) { return lines.join('\n'); }
function q(question, answer) { return { question, answer }; }
function m(question, options, answer, explanation) { return { question, options, answer, explanation }; }
function e(title, useCase, code, description) { return { title, useCase, code, description: (description||'') }; }
function d(heading, text) { return { heading, text }; }
function svgW(w, h, title, inner) {
  return '<svg viewBox="0 0 '+w+' '+h+'" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;font-family:sans-serif">' +
    '<rect x="0" y="0" width="'+w+'" height="'+h+'" rx="8" fill="#f8f9fa" stroke="#dee2e6" stroke-width="1"/>' +
    '<text x="'+(w/2)+'" y="24" text-anchor="middle" font-size="14" font-weight="bold" fill="#333">'+title+'</text>' +
    inner + '</svg>';
}
function R(x,y,w,h,fill,stroke,t1,t2,c1,c2) {
  var box = '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="4" fill="'+fill+'" stroke="'+(stroke||fill)+'" stroke-width="1"/>';
  if (t1) box += '<text x="'+(x+w/2)+'" y="'+(y+(t2?16:20))+'" text-anchor="middle" font-size="11" font-weight="bold" fill="'+(c1||'#fff')+'">'+t1+'</text>';
  if (t2) box += '<text x="'+(x+w/2)+'" y="'+(y+28)+'" text-anchor="middle" font-size="9" fill="'+(c2||'#ddd')+'">'+t2+'</text>';
  return box;
}
function A(x1,y1,x2,y2,c) {
  return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+(c||'#666')+'" stroke-width="1.5" marker-end="url(#arrow)"/>';
}
function T(x,y,text,size,color,anchor) {
  return '<text x="'+x+'" y="'+y+'" font-size="'+(size||10)+'" fill="'+(color||'#333')+'" text-anchor="'+(anchor||'start')+'">'+text+'</text>';
}

var topics = {};
var topicList = [];

function addTopic(id, title, difficulty, estimatedMinutes, tldrItems, laymanDef, deepDiveArr, interviewAns, questionsArr, svgInner, codeExamplesArr, mcqArr) {
  var t = {
    id: id, title: title, difficulty: difficulty, estimatedMinutes: estimatedMinutes,
    tldr: tldrItems, laymanDefinition: laymanDef, deepDive: deepDiveArr,
    interviewAnswer: interviewAns, interviewQuestions: questionsArr,
    diagramSvg: svgW(500, 200, title, svgInner), codeExamples: codeExamplesArr, mcqQuestions: mcqArr
  };
  topics[id] = t;
  topicList.push({ id: id, title: title, difficulty: difficulty, estimatedMinutes: estimatedMinutes, file: id + '.json' });
}

function compactTopic(id, title, diff, mins, tldr, layman, deeps, qas, svg, codes, mcqs) {
  addTopic(id, title, diff, mins, tldr, layman, deeps, '', qas, svg, codes, mcqs);
}

var dd = d;
function dockerTopic(id, title, diff, mins, tldr, layman, d1h, d1t, d2h, d2t, q1, a1, q2, a2, svgText, codeTitle, codeBody) {
  compactTopic(id, title, diff, mins,
    [tldr],
    layman,
    [dd(d1h, d1t), dd(d2h, d2t)],
    [q(q1, a1), q(q2, a2)],
    T(240,100,svgText,9,'#666','middle'),
    [e(codeTitle, '', codeBlock([codeBody]), '')],
    [m('Question?', ['Answer A', 'Answer B', 'Answer C', 'Answer D'], 1, 'Explanation.')]
  );
}

/* ===================== SECTION 1: Docker Fundamentals (1-13) ===================== */

dockerTopic('docker-what-is-docker', 'What is Docker?', 'beginner', 10,
  'Docker is a platform for developing, shipping, and running applications inside lightweight, portable containers.',
  'Docker is like a shipping container for your app. It packages your application with everything it needs (code, runtime, libraries) into a standard unit that runs consistently on any machine.',
  'Containerization Concept', 'Containers are isolated environments that share the host OS kernel. Unlike VMs, they do not include a guest OS, making them lightweight (megabytes vs gigabytes). Containers start in seconds and use fewer resources. Docker standardizes container creation and management across dev, test, and production.',
  'Docker Ecosystem', 'Docker Engine: core runtime that builds and runs containers. Docker Hub: cloud-based registry for sharing images. Docker Compose: multi-container orchestration. Docker Desktop: GUI for desktop containers. Docker Swarm: native clustering and orchestration.',
  'What is Docker?', 'A platform for developing, shipping, and running applications in lightweight containers.',
  'How is Docker different from a VM?', 'Containers share the host OS kernel (no guest OS), making them smaller and faster to start than VMs.',
  'Docker: Container platform for app packaging and deployment. Lightweight, portable, consistent across environments.',
  'Hello Docker', 'docker run hello-world'
);

dockerTopic('docker-vs-vm', 'Docker vs Virtual Machines', 'beginner', 15,
  'Docker containers share the host OS kernel and run as isolated processes, while VMs include a full guest OS with virtualized hardware.',
  'Think of VMs as apartments in a building with their own foundation and utilities (full OS). Docker containers are like rooms in a house sharing the same foundation and utilities (host OS) but with their own furniture (app dependencies).',
  'Architecture Comparison', 'VMs: Hypervisor virtualizes hardware, each VM runs a full guest OS (GBs), boots in minutes. Docker: Docker Engine manages containers, all share host OS kernel (MBs), start in seconds. VMs provide stronger isolation (different kernel), Docker is more resource-efficient.',
  'When to Use Each', 'Use VMs when: you need different OS kernels, require strong isolation for security, running Windows on Linux. Use Docker when: you need fast startup, efficient resource usage, microservices architecture, consistent dev/prod environments, CI/CD pipelines.',
  'What is the key difference between Docker and VMs?', 'Containers share the host OS kernel; VMs each have their own guest OS.',
  'Why are containers faster to start than VMs?', 'Containers start as processes on the host OS without booting a guest OS.',
  'Docker vs VM: Containers share kernel (lightweight, fast). VMs have separate OS (heavy, strong isolation).',
  'Docker vs VM', '# docker run nginx (starts in <1s) vs VM boot (minutes)'
);

dockerTopic('docker-architecture', 'Docker Architecture', 'intermediate', 15,
  'Docker uses a client-server architecture: the Docker client communicates with the Docker daemon (dockerd) via REST API.',
  'Docker architecture is like a restaurant. The Docker client is the waiter (takes your order), the Docker daemon is the chef (cooks the food), and containers are the dishes (the finished product).',
  'Client-Server Model', 'Docker Daemon (dockerd): background service on the host. Listens for API requests, manages images, containers, networks, volumes. Docker Client (docker CLI): command-line tool users interact with. REST API: programmatic interface for automation.',
  'Key Components', 'Docker Images: read-only templates for creating containers. Docker Containers: runnable instances of images. Docker Registries: storage and distribution of images (Docker Hub, private). Docker Objects: networks, volumes, plugins, secrets.',
  'What is the Docker daemon?', 'The background service (dockerd) that manages Docker objects.',
  'How does the Docker client communicate with the daemon?', 'Via REST API over a Unix socket (default) or network port.',
  'Docker Architecture: Client sends commands via REST API to Daemon. Daemon manages images, containers, networks, volumes.',
  'Docker Info', 'docker info  # Shows daemon and system-wide information'
);

dockerTopic('docker-installation', 'Docker Installation', 'beginner', 10,
  'Docker can be installed on Linux, macOS, and Windows. Docker Desktop provides a complete experience on Mac and Windows.',
  'Installing Docker is like setting up a kitchen for your apps. On Windows and Mac, Docker Desktop bundles everything (daemon, client, Kubernetes). On Linux, you install Docker Engine separately.',
  'Linux Installation', 'Ubuntu/Debian: sudo apt install docker.io. CentOS/RHEL: sudo yum install docker. Post-install: sudo systemctl enable --now docker. Add user to docker group: sudo usermod -aG docker $USER. Verify: docker run hello-world.',
  'Mac/Windows Installation', 'Download Docker Desktop from docker.com. Requires WSL2 on Windows. Includes Docker Engine, CLI, Compose, Kubernetes. Verify via docker --version.',
  'How to install Docker on Ubuntu?', 'sudo apt update && sudo apt install docker.io',
  'What is Docker Desktop?', 'A desktop application that includes Docker Engine, CLI, Docker Compose, Kubernetes, and a GUI dashboard.',
  'Docker Installation: apt/yum on Linux, Docker Desktop on Mac/Windows. Add user to docker group.',
  'Verify Installation', 'docker --version && docker run hello-world'
);

dockerTopic('docker-commands', 'Docker Commands', 'beginner', 15,
  'Docker CLI commands manage containers, images, networks, volumes. Common pattern: docker <object> <action>.',
  'Docker commands are like remote controls for your containers. docker ps shows running containers, docker images shows downloaded images, docker pull downloads images, docker run creates and starts containers.',
  'Essential Commands', 'docker pull <image>: download image. docker images: list images. docker run <image>: create+start. docker ps: list running containers (-a for all). docker stop/start/restart <container>. docker rm <container>: remove. docker exec -it <container> bash: open shell.',
  'Advanced Commands', 'docker build -t <tag> .: build image from Dockerfile. docker push <image>: upload to registry. docker logs <container>: view logs. docker inspect <object>: detailed metadata. docker stats: live resource usage. docker system prune: cleanup unused objects.',
  'How to list running containers?', 'docker ps (add -a for all containers including stopped).',
  'How to open a shell inside a running container?', 'docker exec -it <container-name> bash (or sh for Alpine).',
  'Docker Commands: pull, run, ps, stop, rm, exec, logs, build, push. docker <object> <action> pattern.',
  'List Containers', 'docker ps -a  # List all containers'
);

dockerTopic('docker-hub', 'Docker Hub', 'beginner', 10,
  'Docker Hub is a cloud-based registry service for finding, sharing, and managing Docker container images.',
  'Docker Hub is like an app store for container images. Need an NGINX web server? docker pull nginx. PostgreSQL? docker pull postgres. You can also publish your own images.',
  'Image Discovery', 'Official Images: curated by Docker or partners (nginx, node, postgres, python). Verified Publisher: images from trusted organizations. Community: images shared by the Docker community. Content Trust: verify image authenticity with DCT.',
  'Publishing Images', 'docker login: authenticate with Hub. docker tag <image> <username>/<repo>:tag: tag for Hub. docker push <username>/<repo>:tag: upload. Automated builds: connect GitHub for auto-build on push.',
  'What is Docker Hub?', 'A public registry for storing and sharing Docker container images.',
  'How to push an image to Docker Hub?', 'docker login, docker tag myapp username/myapp:v1, docker push username/myapp:v1.',
  'Docker Hub: Public registry for images. pull/push. Official images, verified publishers, community images.',
  'Pull from Hub', 'docker pull nginx:latest  # Downloads latest NGINX'
);

dockerTopic('docker-images-basics', 'Docker Images (Basics)', 'beginner', 15,
  'A Docker image is a lightweight, standalone, executable package that includes everything needed to run software.',
  'A Docker image is like a frozen meal kit containing all ingredients (code, runtime, libraries, config). You run it to get a running container. Images are built from Dockerfiles and stored in registries.',
  'Image Structure', 'Images consist of read-only layers stacked on top of each other. Each layer corresponds to a Dockerfile instruction (RUN, COPY, etc.). Layers are cached and reused across builds. Union File System combines layers into a single view.',
  'Key Properties', 'Images identified by: name:tag (nginx:latest) or image ID (SHA256). Stored locally in /var/lib/docker/. docker image history <image>: view layer history. docker image inspect <image>: detailed metadata.',
  'What is a Docker image?', 'A read-only template with instructions for creating a container. Includes code, runtime, libraries, config.',
  'What tag is used for the latest version?', ':latest (default). Always pin to a specific version for production.',
  'Docker Images: Read-only templates with layered filesystem. Built from Dockerfiles. Stored in registries.',
  'List Images', 'docker images  # Shows all locally stored images'
);

dockerTopic('docker-containers-basics', 'Docker Containers (Basics)', 'beginner', 15,
  'A Docker container is a runnable instance of an image in an isolated environment for running applications as processes.',
  'A container is like a running instance of a frozen meal. The image is the frozen meal (recipe + ingredients), the container is the meal being cooked (running). You can run multiple containers from the same image.',
  'Container Lifecycle', 'Created: docker create (from image). Running: docker start or docker run. Paused: docker pause (freeze processes). Stopped: docker stop (SIGTERM then SIGKILL). Removed: docker rm (delete filesystem).',
  'Container Isolation', 'Containers have their own: filesystem (image layers + writable layer), process namespace (PID 1), network stack (own IP), mount namespace. Isolation via Linux kernel features: namespaces, cgroups, seccomp.',
  'What is a Docker container?', 'A runnable instance of a Docker image. An isolated process on the host.',
  'Difference between create and run?', 'docker create creates a stopped container; docker run creates and starts it immediately.',
  'Docker Containers: Runnable image instances. Isolated via namespaces and cgroups. Lifecycle: create, start, stop, rm.',
  'Run Container', 'docker run -d --name my-nginx -p 80:80 nginx'
);

dockerTopic('docker-registry', 'Docker Registry', 'intermediate', 10,
  'A Docker registry is a storage and distribution system for Docker images. Docker Hub is the default public registry.',
  'A registry is like a library for container images. You push images to a registry so others can pull from anywhere. Use public registries (Docker Hub) or run your own (private registry, ECR, GCR).',
  'Public Registries', 'Docker Hub: default, millions of public images. GitHub Container Registry (ghcr.io): integrated with GitHub. Quay.io: Red Hat. Google Container Registry (gcr.io). Amazon ECR: AWS. Azure Container Registry (ACR).',
  'Private Registry Setup', 'docker run -d -p 5000:5000 --name registry registry:2. Push: docker tag myapp localhost:5000/myapp && docker push. Pull: docker pull localhost:5000/myapp. Secure with TLS and authentication.',
  'What is a Docker registry?', 'A storage system for Docker images for push, pull, and distribution.',
  'How to set up a local private registry?', 'docker run -d -p 5000:5000 --name registry registry:2.',
  'Docker Registry: Store and distribute images. Docker Hub (public), private registries (self-hosted or cloud).',
  'Private Registry', 'docker run -d -p 5000:5000 --name registry registry:2'
);

dockerTopic('docker-engine', 'Docker Engine', 'intermediate', 10,
  'Docker Engine is the core software that runs and manages containers. It includes the daemon (dockerd), API, and CLI.',
  'Docker Engine is the heart of Docker. It builds container images, runs them, and manages everything. When you type docker run, the CLI sends the command to Docker Engine, which creates the container.',
  'Engine Components', 'Dockerd: the background daemon process managing containers, images, networks, volumes. Containerd: industry-standard container runtime (used by Docker, Kubernetes). RunC: low-level runtime that creates and runs containers per OCI spec.',
  'Engine Configuration', 'Config file: /etc/docker/daemon.json. Key options: storage-driver (overlay2), log-driver (json-file, journald), data-root, insecure-registries, registry-mirrors, live-restore.',
  'What is Docker Engine?', 'The core software: dockerd daemon, REST API, and docker CLI. Manages the entire container lifecycle.',
  'What is containerd?', 'An industry-standard container runtime used by Docker and Kubernetes for low-level container management.',
  'Docker Engine: Core container runtime. Includes dockerd, containerd, runc. Config via daemon.json.',
  'Daemon Config', 'cat /etc/docker/daemon.json  # Docker Engine configuration file'
);

dockerTopic('docker-daemon', 'Docker Daemon', 'intermediate', 10,
  'The Docker daemon (dockerd) is a persistent background process that manages Docker objects: images, containers, networks, volumes.',
  'The Docker daemon is like the operating system of your Docker environment. It runs constantly in the background, listening for commands from the Docker client, building images, and managing containers.',
  'Daemon Operations', 'Image management: pull, build, tag, push, prune. Container management: create, start, stop, restart, kill, rm. Network management: create, connect, disconnect, prune. Volume management: create, mount, unmount, prune.',
  'Daemon Security', 'Root access: daemon runs as root (docker group grants root-equivalent access). TLS: enable for remote API. User namespaces: remap container root to non-root host user. Seccomp: filter system calls.',
  'What does the Docker daemon do?', 'Manages all Docker objects: images, containers, networks, volumes.',
  'How to access the Docker daemon remotely?', 'Configure TLS certificates and bind to a TCP port instead of Unix socket only.',
  'Docker Daemon: Persistent background process. Manages container lifecycle. Security via TLS, namespaces, seccomp.',
  'Daemon Logs', 'sudo journalctl -u docker  # View Docker daemon logs (Linux)'
);

dockerTopic('docker-client-server', 'Docker Client-Server Model', 'beginner', 10,
  'Docker follows a client-server architecture where the CLI (client) sends commands to the daemon (server) via REST API.',
  'The Docker client-server model works like a TV remote. You press a button (docker run), the remote sends a signal (REST API request) to the TV (daemon), and the TV shows the program (runs the container).',
  'Communication Methods', 'Unix socket: /var/run/docker.sock (default, local). TCP socket: -H tcp://0.0.0.0:2375 (remote, requires TLS). SSH: -H ssh://user@host. Windows named pipe. DOCKER_HOST env var sets remote endpoint.',
  'API Versioning', 'Docker API versioned (v1.41, v1.42). Client and daemon negotiate API version. docker version shows API version. SDKs available for Python, Go, JavaScript for programmatic access.',
  'How does the CLI communicate with the daemon?', 'Via REST API over a Unix socket (/var/run/docker.sock) by default.',
  'Can the CLI control a remote daemon?', 'Yes, using -H flag or DOCKER_HOST env var pointing to a remote daemon (with TLS).',
  'Client-Server: CLI sends REST API requests to daemon. Communication via Unix socket or TCP (with TLS).',
  'Remote Docker', 'docker -H tcp://remote-host:2375 ps  # Control remote daemon'
);

dockerTopic('docker-object-labels', 'Docker Object Labels', 'intermediate', 10,
  'Labels are key-value metadata attached to Docker objects (containers, images, volumes, networks, daemon).',
  'Labels are like sticky notes on your Docker objects. Label containers with "env=prod" or "team=backend" to organize, filter, and automate tasks.',
  'Using Labels', 'Containers: docker run --label env=prod --label team=backend nginx. Images: LABEL maintainer="team@example.com" in Dockerfile. Filtering: docker ps --filter label=env=prod.',
  'Common Conventions', 'org.opencontainers.image.source: source repository URL. org.opencontainers.image.version: image version. org.opencontainers.image.description: image description. Custom labels per organization.',
  'What are Docker labels?', 'Key-value metadata on Docker objects for organization, filtering, and automation.',
  'How to filter containers by label?', 'docker ps --filter label=env=prod.',
  'Object Labels: Key-value metadata on images, containers, volumes, networks. Used for filtering and organization.',
  'Label Filter', 'docker ps --filter label=com.example.version=1.0'
);

/* ===================== SECTION 2: Docker Images (14-26) ===================== */

dockerTopic('docker-image-layers', 'Image Layers', 'intermediate', 15,
  'Docker images are composed of read-only layers stacked together. Each layer corresponds to a Dockerfile instruction.',
  'Image layers are like layers of a cake. Each layer adds something: base OS, system libraries, application code. Layers are cached and reused across images, saving disk space and speeding up builds.',
  'Layer Mechanics', 'Each RUN, COPY, ADD instruction creates a new layer. Stored in /var/lib/docker/overlay2/. Cache key: instruction content + parent layer hash. Cache invalidated when instruction or parent changes. docker image history shows layers.',
  'Layer Benefits', 'Disk efficiency: shared layers stored once. Build speed: cached layers skip rebuild. Transfer efficiency: push/pull only changed layers. overlay2 layers filesystems via Union FS. Copy-on-write for container changes.',
  'What is an image layer?', 'A read-only filesystem change set from a Dockerfile instruction (RUN, COPY, ADD).',
  'How does Docker cache layers?', 'Each instruction creates a cached layer. If unchanged, the cached layer is reused.',
  'Image Layers: Read-only filesystem changes. Cached and reused. Efficient storage and transfer. overlay2 driver.',
  'Layer History', 'docker image history nginx  # Show layer commands for nginx image'
);

dockerTopic('docker-image-creation', 'Image Creation', 'intermediate', 15,
  'Docker images are created by building a Dockerfile with docker build, or by committing a container with docker commit.',
  'Creating an image is like writing a recipe (Dockerfile) and cooking it (docker build). The recipe lists ingredients (FROM), steps (RUN), and finishing instructions (CMD).',
  'Dockerfile Build', 'docker build -t myapp:v1 . builds from Dockerfile in current dir. -f Dockerfile.prod uses alternate file. --no-cache skips cache. --target stops at specific stage (multi-stage). Build context: files sent to daemon.',
  'Docker Commit', 'docker commit <container> <new-image> creates image from container state. Useful for debugging and snapshots. Not recommended for production because it is non-reproducible. Prefer Dockerfile builds.',
  'What command creates an image from a Dockerfile?', 'docker build -t <tag> <path>.',
  'Why prefer Dockerfile over docker commit?', 'Dockerfile is reproducible, version-controlled, documented, and automated.',
  'Image Creation: docker build (Dockerfile) for reproducibility. docker commit (snapshot) for debugging.',
  'Build Image', 'docker build -t myapp:v1 .  # Build image from Dockerfile'
);

dockerTopic('docker-dockerfile-vs-image', 'Dockerfile vs Image', 'beginner', 10,
  'A Dockerfile is the recipe; a Docker image is the cooked meal. The Dockerfile defines how to build; the image is the result.',
  'The Dockerfile is a recipe card with instructions. The image is the prepared dish. You can share the recipe (Dockerfile) or the dish (image via registry).',
  'Relationship', 'Dockerfile -> docker build -> Image -> docker run -> Container. Dockerfile: human-readable instructions. Image: binary artifact. Multiple images from same Dockerfile with different tags or build args.',
  'Best Practices', 'Version control Dockerfiles with source code. Use .dockerignore to exclude files. Pin base image versions. Use multi-stage builds for smaller images.',
  'What is a Dockerfile?', 'A text file with instructions for building a Docker image. The blueprint for creating images.',
  'Dockerfile vs Image difference?', 'Dockerfile is source code (instructions); image is the built artifact (executable).',
  'Dockerfile vs Image: Dockerfile is recipe, Image is cooked meal. Dockerfile builds images via docker build.',
  'Simple Dockerfile', 'FROM node:20\nWORKDIR /app\nCOPY . .\nCMD ["node", "app.js"]'
);

dockerTopic('docker-image-tagging', 'Image Tagging', 'beginner', 10,
  'Tags are human-readable identifiers for Docker images, typically following the format name:tag.',
  'Tags are like version labels. nginx:latest is the most recent, nginx:1.25 is version 1.25. Tags organize different versions. Without a tag, :latest is assumed, but pinning to a specific version is best practice.',
  'Tagging Conventions', 'docker tag <source> <target> creates alias. Format: <registry>/<username>/<image>:<tag>. Common patterns: v1.0.0 (semver), stable, edge, git-<commit-sha>, build-<number>.',
  'Best Practices', 'Never use :latest in production. Use semantic versioning. Tag with Git commit SHA for traceability. Use environment tags (staging, production) for deployment. Automate tagging in CI/CD.',
  'How to tag an image?', 'docker tag source-image target-image:tag.',
  'What is the default tag?', ':latest is the default. Avoid it for production use.',
  'Image Tagging: name:tag format. :latest is default. Best practice: semver + commit SHA for traceability.',
  'Tag Example', 'docker tag myapp:v1.0.0 myregistry.com/myapp:v1.0.0'
);

dockerTopic('docker-image-size', 'Image Size', 'intermediate', 15,
  'Docker image size impacts download time, storage costs, and startup speed. Smaller images are faster and more efficient.',
  'Image size matters: smaller images download faster, use less disk space, and start quicker. A bloated Node image can be 1.5GB while an optimized one can be under 200MB.',
  'Reducing Size', 'Use Alpine-based images (node:20-alpine ~120MB vs node:20 ~1GB). Multi-stage builds. Minimize layers: combine RUN commands. Clean caches: rm -rf /var/lib/apt/lists/*. Use .dockerignore.',
  'Size Comparison', 'ubuntu:22.04 ~80MB, alpine:3.19 ~7MB, node:20 ~1GB, node:20-alpine ~120MB, python:3.12 ~900MB, python:3.12-alpine ~80MB. Alpine images are 5-10x smaller than full distributions.',
  'How to reduce image size?', 'Use Alpine, multi-stage builds, combine RUN commands, clean caches, use .dockerignore.',
  'What is the smallest base image?', 'Alpine (~5MB) or scratch (truly empty for statically linked binaries).',
  'Image Size: Smaller = faster pull, less storage, quicker startup. Alpine, multi-stage, minimize layers.',
  'Check Size', 'docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"'
);

dockerTopic('docker-image-security', 'Image Security', 'advanced', 20,
  'Docker image security involves scanning for vulnerabilities, using trusted base images, and following security best practices.',
  'Image security is like checking ingredients for contamination. Scan images for known vulnerabilities (CVEs), use official base images, and avoid including secrets. Tools like Docker Scout and Trivy check for issues.',
  'Vulnerability Scanning', 'Docker Scout: built-in scanning. Trivy: open-source by Aqua Security. Snyk: developer security platform. Scan in CI/CD. Fail build on critical vulnerabilities. Remediate by updating base images.',
  'Security Best Practices', 'Use official images. Pin exact versions. Scan regularly. Use distroless images (minimal attack surface). Run as non-root (USER instruction). Never store secrets in images. Enable Docker Content Trust.',
  'How to scan an image for vulnerabilities?', 'docker scout quickview <image> or trivy image <image>.',
  'Why run as non-root?', 'If compromised, root access in container = root on host by default. USER instruction limits privileges.',
  'Image Security: Vulnerability scanning, trusted base images, minimal attack surface, non-root users, no secrets.',
  'Scan Image', 'docker scout quickview nginx:latest  # Scan for CVEs'
);

dockerTopic('docker-image-distribution', 'Image Distribution', 'intermediate', 10,
  'Docker images are distributed via registries. Images are pushed to and pulled from registries over HTTPS.',
  'Image distribution is like shipping packages. You build the image (pack), push to registry (ship), and others pull (receive). Only changed layers transfer, making it efficient.',
  'Distribution Workflow', 'Build locally -> push to registry -> pull from registry -> run containers. docker push <registry>/<image>:<tag> uploads layers. docker pull downloads layers. Only changed layers transfer.',
  'Best Practices', 'Use registry mirrors for faster pulls. Tag with commit SHA for reproducibility. Use GitHub Container Registry or cloud registries. Enable image retention policies. Use OCI-compliant registries.',
  'How are images distributed?', 'Through registries: push from builder, pull to deploy. Only changed layers transfer.',
  'What is a registry mirror?', 'A caching proxy for Docker Hub that speeds up pulls by storing frequently accessed images locally.',
  'Image Distribution: push/pull via registries. Layer caching reduces transfer. Mirrors speed up pulls.',
  'Push to Registry', 'docker push myregistry.com/myapp:v1.0.0'
);

dockerTopic('docker-image-caching', 'Image Caching', 'intermediate', 15,
  'Docker caches image layers during builds to speed up subsequent builds. Understanding cache mechanics is crucial for CI/CD.',
  'Image caching is like saving progress in a game. Docker checks if each instruction layer can be reused. If unchanged, Docker skips that step. Rebuilds go from minutes to seconds.',
  'Cache Mechanics', 'Cache key: instruction + parent layer hash. Cache hit: reuse layer. Cache miss: execute instruction. Cache invalidation: changing COPY files, changing RUN command, or --no-cache flag. All subsequent layers after a miss must rebuild.',
  'Cache Optimization', 'Order instructions by change frequency: base image (rare), deps (infrequent), source code (frequent). COPY package.json separately from source. Use --cache-from in CI/CD.',
  'How does Docker cache layers?', 'Each instruction layer is cached. If unchanged, cache is reused.',
  'How to optimize Dockerfile for caching?', 'Place infrequently changed instructions first. Copy dependency files separately from source code.',
  'Image Caching: Layers cached by instruction content. Optimize by ordering: base, deps, app code.',
  'Cache Optimized', 'FROM node:20\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nCMD ["node", "app.js"]'
);

dockerTopic('docker-multi-stage-builds', 'Multi-Stage Builds', 'intermediate', 20,
  'Multi-stage builds use multiple FROM statements in a single Dockerfile to create smaller final images by separating build and runtime.',
  'Multi-stage builds are like having a workshop separate from the final building. Build with heavy tools in one stage, copy only the finished product to a slim final stage. Keeps build tools out of production images.',
  'How It Works', 'Multiple FROM statements, each starts a new stage. COPY --from=<stage> <source> <dest> copies between stages. Each stage can use different base images. --target <stage> stops at a specific stage.',
  'Common Patterns', 'Go builder: stage 1 = golang:1.22 compile, stage 2 = alpine copy binary. Node: stage 1 = node:20 build, stage 2 = node:20-alpine runtime. Frontend: stage 1 = node:20 build, stage 2 = nginx:alpine serve.',
  'What are multi-stage builds?', 'Multiple FROM statements to separate build environment from runtime for smaller final images.',
  'How to copy between stages?', 'COPY --from=<stage-name> <source> <destination>.',
  'Multi-Stage Builds: Separate build (fat) and runtime (slim) stages. Smaller images, no build tools in production.',
  'Multi-Stage Dockerfile', 'FROM node:20 AS builder\nWORKDIR /app\nCOPY . .\nRUN npm ci && npm run build\nFROM nginx:alpine\nCOPY --from=builder /app/dist /usr/share/nginx/html'
);

dockerTopic('docker-image-versioning', 'Image Versioning', 'intermediate', 10,
  'Image versioning strategies help track, deploy, and roll back container images across environments.',
  'Image versioning is like labeling product versions. v1.0.0, v1.1.0, v2.0.0. Semantic versioning for releases, commit SHA tags for traceability.',
  'Versioning Strategies', 'Semantic Versioning: v<major>.<minor>.<patch>. Git SHA: 7-char commit hash for reproducibility. Combined: v1.2.3-abc1234. Environment tags: staging, production.',
  'CI/CD Tagging', 'CI auto-tags images: <branch>-<commit-sha>-<build-number>. Promote tags across environments. When promoting from staging to production, retag the same image no rebuild needed.',
  'Common tagging strategies?', 'Semantic versioning (v1.2.3), Git SHA (abc1234), combined (v1.2.3-abc1234), environment (staging).',
  'Why tag with Git commit SHA?', 'Provides exact traceability. You know exactly which code version produced the image.',
  'Image Versioning: Semantic version, Git SHA, or combined. CI/CD automation for tagging. Promote across environments.',
  'CI/CD Tagging', 'docker build -t myapp:$CI_COMMIT_SHA .\ndocker tag myapp:$CI_COMMIT_SHA myapp:v1.2.3'
);

dockerTopic('docker-base-images', 'Base Images', 'intermediate', 10,
  'Base images provide the foundation for your Docker images: the OS, runtime, and core libraries your application needs.',
  'Base images are like the foundation of a house. Choose the right one based on your needs. Options range from full-featured (Ubuntu) to tiny (Alpine) to minimal (Distroless).',
  'Popular Base Images', 'Ubuntu: full-featured, ~80MB. Debian: stable, ~50MB. Alpine: tiny, ~5MB. Distroless: minimal, no shell. Slim variants: node:20-slim, python:3.12-slim reduced size.',
  'Choosing a Base Image', 'Full OS (Ubuntu/Debian): for maximum compatibility. Alpine: for minimal size. Distroless: for security-sensitive production. Slim: good balance. Always prefer official/verified images.',
  'What is a base image?', 'The starting point for a Docker image (FROM instruction). Provides OS and runtime foundation.',
  'What is the smallest distribution base?', 'Alpine Linux (~5MB). Even smaller: scratch for statically linked binaries.',
  'Base Images: Foundation for Docker images. Options: Ubuntu (full), Alpine (tiny), Distroless (minimal), Slim (balanced).',
  'Base Image Examples', 'FROM node:20-alpine\nFROM python:3.12-slim'
);

dockerTopic('docker-alpine-images', 'Alpine Images', 'intermediate', 10,
  'Alpine-based Docker images are built on Alpine Linux, a security-focused lightweight distribution (~5MB).',
  'Alpine is the minimalist choice. ~5MB base image due to musl libc and busybox. Much smaller images but occasional compatibility issues with software compiled for glibc.',
  'Alpine Advantages', 'Tiny size: ~5MB vs Ubuntu ~80MB. Security-focused. apk package manager. Fast pull: small images download instantly. Most official images have -alpine variants.',
  'Compatibility Considerations', 'musl libc not 100% glibc compatible. Some Node.js native modules need musl compilation. Python wheels need musl builds. Limited debugging tools (install bash/curl with apk).',
  'What is Alpine Linux?', 'A lightweight, security-oriented Linux distribution based on musl libc. ~5MB base image.',
  'When to use Alpine images?', 'When image size is critical and your dependencies are compatible with musl libc.',
  'Alpine Images: Tiny base (~5MB), security-focused, fast pulls. Potential musl compatibility issues.',
  'Alpine Dockerfile', 'FROM node:20-alpine\nRUN apk add --no-cache curl\nCOPY . .\nCMD ["node", "app.js"]'
);

dockerTopic('docker-distroless-images', 'Distroless Images', 'intermediate', 15,
  'Distroless images contain only your application and its runtime dependencies with no shell, package manager, or OS utilities.',
  'Distroless images are the most minimal and secure. No shell for attackers to exploit. No package manager to install malware. Multi-stage build pattern: build in full OS, copy artifacts to distroless.',
  'Advantages', 'Minimal attack surface: no shell, no package manager. Smaller size: 5-20MB for most apps. Reduced CVEs. Production-first: not intended for debugging (no shell). Immutable infrastructure.',
  'Creating Distroless Images', 'Use Google distroless bases: gcr.io/distroless/nodejs20-debian12, gcr.io/distroless/java17-debian12. Multi-stage: build in full OS stage, COPY to distroless. Debug variants with -debug suffix for troubleshooting.',
  'What are distroless images?', 'Minimal images with only app and runtime dependencies. No shell, package manager, or utilities.',
  'Why use distroless images?', 'Maximum security: minimal attack surface, no shell for attackers, fewer vulnerabilities.',
  'Distroless Images: Only app + runtime. No shell/package manager. Minimal attack surface. Multi-stage build pattern.',
  'Distroless Dockerfile', 'FROM node:20 AS builder\nWORKDIR /app\nCOPY . .\nRUN npm ci && npm run build\nFROM gcr.io/distroless/nodejs20-debian12\nCOPY --from=builder /app /app\nCMD ["/app/server.js"]'
);

/* ===================== SECTION 3: Docker Containers (27-39) ===================== */

dockerTopic('docker-container-lifecycle', 'Container Lifecycle', 'beginner', 10,
  'The container lifecycle includes: create, start, stop, restart, pause, unpause, kill, and remove.',
  'A container life is like a light bulb: created (manufactured), running (turned on), stopped (turned off), paused (dimmed), killed (smashed), removed (thrown away).',
  'Lifecycle Commands', 'docker create: create container (stopped). docker start: start stopped. docker run = create + start. docker stop: SIGTERM then SIGKILL. docker restart: stop + start. docker pause: freeze processes. docker kill: immediate SIGKILL. docker rm: remove.',
  'Container States', 'Created: exists not running. Running: processes active. Paused: frozen. Stopped: exited. Dead: removal in progress. Removed: no longer exists. docker ps -a shows all states.',
  'What does docker stop do?', 'Sends SIGTERM (graceful), waits (default 10s), then SIGKILL if still running.',
  'Difference between stop and kill?', 'docker stop sends SIGTERM (graceful), docker kill sends SIGKILL (immediate).',
  'Container Lifecycle: create, start/stop, pause/unpause, kill, rm. States: created, running, paused, stopped, removed.',
  'Lifecycle Commands', 'docker run -d --name myapp nginx\ndocker stop myapp\ndocker rm myapp'
);

dockerTopic('docker-run-vs-exec', 'docker run vs docker exec', 'beginner', 10,
  'docker run creates and starts a new container. docker exec runs a command inside an already running container.',
  'docker run is like ordering a new pizza. docker exec is like adding toppings to an existing pizza.',
  'docker run', 'Creates new container from image. Default command from Dockerfile CMD/ENTRYPOINT. Options: -d (detached), -it (interactive), --name, -p (ports), -v (volumes), -e (env vars). --rm auto-removes on exit.',
  'docker exec', 'Runs command in running container. docker exec -it <container> bash: open shell. docker exec <container> ls: single command. Cannot exec into stopped container.',
  'Difference between run and exec?', 'docker run creates a new container. docker exec runs in an existing running container.',
  'When to use docker exec?', 'Debugging: inspect files, check logs, test connectivity. Maintenance: install tools temporarily.',
  'run vs exec: docker run = new container. docker exec = command in running container.',
  'Exec Example', 'docker exec -it my-container bash  # Open shell inside container'
);

dockerTopic('docker-port-mapping', 'Port Mapping', 'intermediate', 15,
  'Port mapping exposes container ports to the host, making containerized services accessible from outside Docker.',
  'Port mapping is like opening a door between container and outside world. -p 8080:80 means "forward host port 8080 to container port 80."',
  'Port Mapping Syntax', '-p <host-port>:<container-port> (TCP). /udp for UDP. /sctp for SCTP. -p <ip>:<host>:<container> (bind IP). -p 8080-8090:8080-8090 (ranges). -P publishes all exposed ports to random host ports.',
  'Port Mapping Details', 'Host port must be unique. Container port can be same across containers. docker port <container> shows mappings. Kernel iptables NAT forwards traffic.',
  'How to map port 80 to 8080?', 'docker run -p 8080:80 nginx.',
  'What does -P do?', 'Publishes all container ports (from EXPOSE) to random high-numbered host ports.',
  'Port Mapping: -p host:container. Exposes containers to network. -P publishes all exposed ports.',
  'Port Mapping', 'docker run -d -p 8080:80 -p 443:443 nginx'
);

dockerTopic('docker-volume-mounts', 'Volume Mounts', 'intermediate', 15,
  'Volume mounts persist data generated by containers and share data between containers or between host and container.',
  'Volume mounting is like plugging an external hard drive into your container. Data survives container removal. Types: named volumes (Docker-managed), bind mounts (host path), tmpfs (in-memory).',
  'Volume Types', 'Named volumes: docker volume create mydata, -v mydata:/app/data. Docker-managed in /var/lib/docker/volumes/. Bind mounts: -v /host/path:/container/path. tmpfs: --tmpfs /app/tmp (in-memory, non-persistent).',
  'Volume Operations', 'docker volume ls: list. docker volume inspect: details. docker volume prune: remove unused. docker volume rm: delete. :ro for read-only. Copy between volumes with temp container.',
  'How to persist container data?', 'Use named volumes: docker volume create mydata && docker run -v mydata:/data myapp.',
  'What is a bind mount?', 'Maps a host directory into the container. Useful for development and config injection.',
  'Volume Mounts: Named volumes (Docker-managed), bind mounts (host path), tmpfs (in-memory).',
  'Volume Example', 'docker volume create myapp-data\ndocker run -v myapp-data:/app/data myapp'
);

dockerTopic('docker-environment-variables', 'Environment Variables', 'beginner', 10,
  'Environment variables pass configuration to containers at runtime: database URLs, API keys, mode flags, settings.',
  'Environment variables are like configuration cards handed to your container when it starts. Instead of hardcoding settings, pass them as env vars for reuse across environments.',
  'Setting Variables', '-e MY_VAR=value: single variable. --env-file .env: load from file. Dockerfile ENV: default (overridden by -e). docker run -e MY_VAR passes host variable value into container.',
  'Accessing Variables', 'In container: echo $MY_VAR. In scripts: process.env.MY_VAR (Node), os.environ["MY_VAR"] (Python). Docker Compose: environment: KEY=VALUE.',
  'How to pass environment variables?', '-e KEY=VALUE or --env-file .env on docker run.',
  'ENV vs -e difference?', 'ENV in Dockerfile sets defaults. -e overrides those defaults at runtime.',
  'Environment Variables: -e or --env-file for configuration. Override Dockerfile ENV defaults.',
  'Env Examples', 'docker run -e NODE_ENV=production -e DB_URL=postgres://localhost:5432 myapp'
);

dockerTopic('docker-resource-limits', 'Resource Limits', 'intermediate', 15,
  'Docker can limit CPU, memory, and I/O resources per container using cgroups (control groups).',
  'Resource limits prevent one container from overwhelming the host. Like setting boundaries: "This container can use at most 512MB RAM and 0.5 CPU cores."',
  'Memory Limits', '--memory=512m: max memory. --memory-reservation=256m: soft limit. --memory-swap=1g: memory+swap limit. OOM: container killed if limit exceeded.',
  'CPU Limits', '--cpus=1.5: limit to 1.5 cores. --cpu-shares=512: relative weight (default 1024). --cpuset-cpus=0-3: pin to specific CPUs. docker stats: monitor resource usage.',
  'How to limit memory to 256MB?', 'docker run --memory=256m myapp.',
  'How to limit CPU?', '--cpus=0.5 (half core) or --cpus=2 (two cores).',
  'Resource Limits: CPU (--cpus), Memory (--memory). Prevent noisy neighbors. Set in docker run or compose.',
  'Resource Limits', 'docker run --memory=512m --cpus=0.5 myapp'
);

dockerTopic('docker-container-networking', 'Container Networking', 'intermediate', 15,
  'Docker networking allows containers to communicate with each other and the outside world through virtual networks.',
  'Container networking is like setting up phones between containers. Containers on the same network can reach each other by name. docker network create mynet makes containers discoverable by name.',
  'Network Types', 'Bridge (default): private network, containers get IPs on 172.17.0.0/16. Host: share host network (no isolation). None: no networking. Overlay: multi-host (Swarm). Macvlan: assign MAC addresses.',
  'DNS and Discovery', 'Built-in DNS at 127.0.0.11. Container name resolution on user-defined networks. Docker Compose: service names resolve automatically.',
  'How do containers communicate?', 'On the same network, containers reach each other by container name (DNS) or IP.',
  'What is the default network?', 'bridge (docker0). A private internal network on the host.',
  'Container Networking: bridge, host, none, overlay. DNS resolution by name. Network isolation.',
  'Network Create', 'docker network create mynet\ndocker run --network=mynet --name web nginx'
);

dockerTopic('docker-container-logs', 'Container Logs', 'beginner', 10,
  'Docker captures stdout and stderr from containers and provides commands to view, follow, and manage log output.',
  'Container logs are like a security camera recording everything your container outputs. docker logs shows the recording. Essential for debugging and monitoring.',
  'Log Commands', 'docker logs <container>: show all logs. -f: follow (stream). --tail 100: last 100 lines. --since 5m: last 5 minutes. --timestamps: include timestamps.',
  'Log Drivers', 'json-file (default): JSON files on disk. journald: systemd journal. syslog: syslog server. fluentd: Fluentd. awslogs: CloudWatch. gelf: Graylog. Configure via --log-driver or daemon.json.',
  'How to view logs in real time?', 'docker logs -f <container> follows log output like tail -f.',
  'What is the default log driver?', 'json-file stores logs as JSON files in /var/lib/docker/containers/<id>/<id>-json.log.',
  'Container Logs: docker logs to view, -f to follow. Multiple log drivers: json-file, journald, syslog, awslogs.',
  'Log Commands', 'docker logs -f --tail 50 my-container'
);

dockerTopic('docker-container-health', 'Container Health Checks', 'intermediate', 15,
  'Health checks allow Docker to periodically check if a container is working correctly via the HEALTHCHECK instruction.',
  'A health check is like a regular checkup. Docker runs a command inside the container. If it succeeds, the container is "healthy." If it fails repeatedly, "unhealthy." Helps orchestrators know when to restart.',
  'Dockerfile HEALTHCHECK', 'HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD curl -f http://localhost/ || exit 1. Interval: how often. Timeout: max per check. Start-period: grace period. Retries: failures before unhealthy.',
  'Health Status', 'docker ps shows health (healthy, unhealthy, starting). docker inspect shows health check log entries.',
  'How to add a health check?', 'HEALTHCHECK instruction in Dockerfile: HEALTHCHECK CMD curl -f http://localhost/ || exit 1.',
  'What does start-period do?', 'Grace period before health checks count toward retries. Useful for slow-starting apps.',
  'Health Checks: HEALTHCHECK instruction. healthy/unhealthy/starting status. Used by orchestrators.',
  'Health Check', 'HEALTHCHECK --interval=30s CMD wget -qO- http://localhost:3000/health || exit 1'
);

dockerTopic('docker-restart-policies', 'Restart Policies', 'intermediate', 10,
  'Restart policies control whether Docker automatically restarts a container when it exits or the daemon restarts.',
  'Restart policies are like an auto-reset button. Options: no (never restart), always (always restart), unless-stopped, on-failure (only on error exit codes).',
  'Policy Options', '--restart=no: never (default). --restart=always: always regardless of exit code. --restart=unless-stopped: unless explicitly stopped. --restart=on-failure[:max-retries]: only on non-zero exit. docker update --restart=<policy> <container>.',
  'Policy Behavior', 'Docker daemon restart: always and unless-stopped containers start. on-failure do not. Exponential backoff between retries. docker stop respected by unless-stopped.',
  'What policy keeps a container running?', '--restart=always restarts regardless of exit code or daemon restart.',
  'Always vs unless-stopped?', 'always restarts even after docker stop. unless-stopped respects explicit stop.',
  'Restart Policies: no, always, unless-stopped, on-failure. Exponential backoff. docker update changes policy.',
  'Restart Example', 'docker run -d --restart=unless-stopped nginx'
);

dockerTopic('docker-container-cleanup', 'Container Cleanup', 'beginner', 10,
  'Regular cleanup removes unused containers, images, volumes, and networks to free disk space.',
  'Container cleanup is like taking out the trash. Every container without --rm stays on disk. docker system prune cleans everything.',
  'Cleanup Commands', 'docker container prune: remove stopped containers. docker image prune: remove dangling images. docker volume prune: remove unused volumes. docker network prune: remove unused networks. docker system prune -a --volumes: thorough cleanup.',
  'Automated Cleanup', 'docker run --rm: auto-remove on exit. docker system prune -f --filter "until=24h": remove old objects. Cron job: schedule cleanup. Docker Desktop Dashboard shows disk usage.',
  'How to auto-remove container on exit?', 'docker run --rm <image>.',
  'What does docker system prune do?', 'Removes all stopped containers, dangling images, and unused networks.',
  'Container Cleanup: docker system prune, --rm flag. Prevents disk bloat.',
  'Cleanup', 'docker system prune -a --volumes -f'
);

dockerTopic('docker-container-security', 'Container Security', 'advanced', 20,
  'Container security involves runtime protection, capability dropping, seccomp profiles, AppArmor, and read-only filesystems.',
  'Container security is like securing an apartment. Isolation (namespaces), resource limits (cgroups), and restricted privileges (capabilities). Further lock down by dropping all capabilities and running as non-root.',
  'Security Mechanisms', 'Capabilities: --cap-drop ALL --cap-add NET_BIND_SERVICE. Seccomp: filter syscalls. AppArmor: mandatory access control. Read-only rootfs: --read-only prevents filesystem writes.',
  'Best Practices', 'Run as non-root: USER appuser. Drop all capabilities then add only needed. Read-only filesystem with tmpfs for writable dirs. no-new-privileges. Enable AppArmor/SELinux. Use Docker Bench Security.',
  'How to run container without root?', 'Use USER in Dockerfile or --user 1000:1000 on docker run.',
  'What are Linux capabilities?', 'Fine-grained privileges like CAP_NET_BIND_SERVICE. Drop all, add only needed for least privilege.',
  'Container Security: Drop capabilities, seccomp, AppArmor, read-only, non-root. Defense in depth.',
  'Security Options', 'docker run --cap-drop ALL --cap-add NET_BIND_SERVICE --read-only --security-opt no-new-privileges myapp'
);

dockerTopic('docker-container-orchestration', 'Container Orchestration', 'intermediate', 15,
  'Container orchestration automates deployment, scaling, networking, and management of containers across clusters.',
  'Orchestration is like being a conductor of a container orchestra. When you have many containers on many servers, you need coordination: which runs where, scaling, failure recovery.',
  'Orchestration Features', 'Service discovery: find by name. Load balancing: distribute traffic. Scaling: increase/decrease replicas. Self-healing: restart failed containers. Rolling updates: zero-downtime. Secret management.',
  'Swarm vs Kubernetes', 'Swarm: simpler, native to Docker, easier setup, limited features. K8s: industry standard, complex, rich features, massive ecosystem. docker stack deploy vs kubectl apply.',
  'What is container orchestration?', 'Automated management of containers across clusters: deployment, scaling, self-healing.',
  'Simplest Docker-native orchestrator?', 'Docker Swarm built into Engine, simpler than Kubernetes, good for basic needs.',
  'Container Orchestration: Swarm (native, simple) and Kubernetes (industry standard, powerful).',
  'Swarm Init', 'docker swarm init\ndocker service create --replicas 3 nginx'
);

/* ===================== SECTION 4: Dockerfile (40-52) ===================== */

dockerTopic('docker-dockerfile-syntax', 'Dockerfile Syntax', 'beginner', 10,
  'A Dockerfile is a text file with instructions for building a Docker image. Each instruction is a command followed by arguments.',
  'Dockerfile syntax is like writing a recipe. Each line is an instruction: FROM (base), RUN (do something), COPY (add files), CMD (serve). FROM must be first. Comments start with #. Instructions conventionally UPPERCASE.',
  'Basic Instructions', 'FROM <image>: base image (required first). RUN <command>: execute command. COPY <src> <dest>: copy files. ADD: like COPY + tar extraction + URL. CMD/ENTRYPOINT: container command. WORKDIR: working directory. ENV: environment variable.',
  'Best Practices', 'Use specific base image tags. Minimize layers (combine RUN). Use .dockerignore. Multi-stage builds. Pin package versions. Use LABEL for metadata. Use HEALTHCHECK for production.',
  'First instruction in Dockerfile?', 'FROM specifies the base image. Must be the first instruction.',
  'What does WORKDIR do?', 'Sets the working directory for subsequent RUN, CMD, ENTRYPOINT, COPY, ADD instructions.',
  'Dockerfile Syntax: UPPERCASE instructions, FROM first, comments with #. Each instruction creates a layer.',
  'Basic Dockerfile', 'FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nCMD ["node", "server.js"]'
);

dockerTopic('docker-from', 'FROM Instruction', 'beginner', 5,
  'FROM initializes a new build stage and sets the base image. It is the first instruction in a Dockerfile.',
  'FROM is like choosing the foundation for your house. FROM node:20 means start on top of Node.js 20. Every Dockerfile needs at least one FROM. Multi-stage builds use multiple FROM statements.',
  'FROM Syntax', 'FROM <image> (e.g., ubuntu). FROM <image>:<tag> (e.g., node:20-alpine). FROM <image>@<digest> (pinned by SHA). FROM <image> AS <name> (named stage). FROM --platform=<platform> (target platform).',
  'Base Image Selection', 'Alpine: minimal size. Ubuntu/Debian: full package ecosystem. Distroless: maximum security. Slim: balanced. Scratch: truly empty for Go/Rust binaries. Always prefer official images.',
  'What does FROM do?', 'Sets the base image. Must be the first instruction. Creates a new build stage.',
  'What is a multi-stage FROM?', 'Multiple FROM statements in one Dockerfile. Each FROM starts a new stage.',
  'FROM: Base image for Dockerfile. Multiple FROM for multi-stage builds. Use specific tags.',
  'FROM Examples', 'FROM node:20-alpine\nFROM scratch  # For Go binaries'
);

dockerTopic('docker-run', 'RUN Instruction', 'intermediate', 10,
  'RUN executes commands in a new layer on top of the current image and commits the result. Used for installing packages.',
  'RUN is like following a recipe step. RUN apt-get install nginx installs nginx inside the image. Each RUN creates a new layer. Combine commands with && to minimize layers.',
  'RUN Syntax', 'RUN <command> (shell form: /bin/sh -c). RUN ["executable", "arg1"] (exec form: no shell). Shell form supports pipes, && chains. Exec form avoids shell string handling.',
  'Layer Optimization', 'Combine: RUN apt-get update && apt-get install -y pkg1 pkg2 && rm -rf /var/lib/apt/lists/*. Use --no-install-recommends. Sort packages alphabetically.',
  'What does RUN do?', 'Executes a command in a new layer. Result is committed as part of the image.',
  'Shell vs exec form?', 'Shell: RUN apt-get install (uses /bin/sh -c). Exec: RUN ["apt-get", "install"] (no shell).',
  'RUN: Execute commands in image layers. Shell or exec form. Minimize layers by combining commands.',
  'RUN Example', 'RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates && rm -rf /var/lib/apt/lists/*'
);

dockerTopic('docker-copy-vs-add', 'COPY vs ADD', 'intermediate', 15,
  'COPY and ADD both copy files from the build context into the image. ADD has extra features: tar extraction and URL support.',
  'COPY is simple and predictable: copy files from project into image. ADD also auto-extracts tar archives and downloads URLs. Best practice: use COPY unless you need ADD extras.',
  'COPY', 'COPY <src> <dest>: copy files from context to image. --chown=<user>:<group> set ownership. --from=<stage> copy from previous build stage. Multiple sources. Wildcards supported.',
  'ADD', 'ADD <src> <dest>: all COPY features plus: auto-extract local tar.gz, URL download. Use COPY for files, ADD only when tar extraction or URL download is specifically needed.',
  'When to use COPY vs ADD?', 'Always prefer COPY (transparent, predictable). Use ADD for tar extraction or URL download only.',
  'How to copy from a previous stage?', 'COPY --from=<stage-name> <source> <dest> in multi-stage builds.',
  'COPY vs ADD: COPY for simple file copy. ADD for tar extraction and URL download. Prefer COPY.',
  'COPY Example', 'COPY . .\nCOPY --from=builder /app/dist /usr/share/nginx/html'
);

dockerTopic('docker-cmd-vs-entrypoint', 'CMD vs ENTRYPOINT', 'intermediate', 15,
  'CMD provides default arguments for the container. ENTRYPOINT configures the container to run as an executable.',
  'ENTRYPOINT is the command (the program), CMD is the default arguments. docker run myapp --help overrides CMD but not ENTRYPOINT.',
  'CMD', 'CMD ["executable", "arg1", "arg2"] (exec form, preferred). CMD command arg1 arg2 (shell form). CMD ["arg1", "arg2"] (default args to ENTRYPOINT). Overridden by docker run command.',
  'ENTRYPOINT', 'ENTRYPOINT ["executable", "arg1"] (exec form). Not overridden by docker run args. --entrypoint flag to override. Best pattern: ENTRYPOINT fixed command, CMD default args.',
  'Difference between CMD and ENTRYPOINT?', 'CMD provides defaults (overridden by docker run args). ENTRYPOINT is main executable.',
  'How to make a container accept arguments?', 'ENTRYPOINT ["myapp"] CMD ["--help"]. docker run myimage --version overrides CMD.',
  'CMD vs ENTRYPOINT: ENTRYPOINT = executable, CMD = default arguments.',
  'CMD + ENTRYPOINT', 'ENTRYPOINT ["node"]\nCMD ["app.js"]  # docker run myimage = "node app.js"'
);

dockerTopic('docker-workdir', 'WORKDIR Instruction', 'beginner', 5,
  'WORKDIR sets the working directory for RUN, CMD, ENTRYPOINT, COPY, and ADD instructions that follow it.',
  'WORKDIR is like saying "change to this folder." Instead of RUN cd /app everywhere, set WORKDIR /app once. Creates directory if it does not exist.',
  'WORKDIR Details', 'WORKDIR /path/to/dir: set working directory. Relative: WORKDIR app (relative to previous). Multiple WORKDIRs change directory. Creates dir if missing. Affects RUN, CMD, ENTRYPOINT, COPY, ADD.',
  'Best Practices', 'Always set WORKDIR explicitly (do not rely on base image default). Use absolute paths. Set early in Dockerfile (before COPY).',
  'What does WORKDIR do?', 'Sets the current working directory for subsequent instructions.',
  'Why use WORKDIR instead of RUN cd?', 'WORKDIR is cleaner, affects all instructions, creates dir if missing.',
  'WORKDIR: Set working directory for RUN, CMD, COPY. Creates directory if missing. Use absolute paths.',
  'WORKDIR Example', 'WORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .'
);

dockerTopic('docker-env', 'ENV Instruction', 'beginner', 5,
  'ENV sets environment variables in the image that persist in containers created from it.',
  'ENV is like writing permanent config into the image. ENV NODE_ENV=production means every container has it set. Override at runtime with docker run -e.',
  'ENV Details', 'ENV <key>=<value> set one var. ENV <key>=<value> <key2>=<value2> set multiple. ENV vs ARG: ENV persists at runtime, ARG is build-time only.',
  'Best Practices', 'Set defaults with ENV. Override per environment at runtime. Do NOT use ENV for secrets (use Docker secrets or runtime env vars).',
  'What does ENV do?', 'Sets environment variables that persist in the image and are available in containers.',
  'ENV vs ARG difference?', 'ENV persists in image (runtime). ARG is build-time only.',
  'ENV: Set env vars in image. Override with -e. Do not use for secrets.',
  'ENV Example', 'ENV NODE_ENV=production PORT=3000\nEXPOSE $PORT'
);

dockerTopic('docker-expose', 'EXPOSE Instruction', 'beginner', 5,
  'EXPOSE documents which ports a container listens on at runtime. It is metadata, not a runtime configuration.',
  'EXPOSE is like a label saying "this container uses port 80." It documents the port but does NOT publish it. Still need -p or -P to make it accessible.',
  'EXPOSE Details', 'EXPOSE <port> (TCP default). /udp for UDP. /tcp for explicit TCP. Multiple EXPOSE lines. Documentation only: no networking effect. Used by docker inspect and orchestration tools.',
  'EXPOSE vs -p', 'EXPOSE: documentation only. -p: actually publishes the port. -P: publishes all EXPOSEd ports to random host ports.',
  'What does EXPOSE do?', 'Documents that the container listens on the specified port. Metadata only.',
  'How to make an exposed port accessible?', 'Use -p on docker run or -P to publish all exposed ports automatically.',
  'EXPOSE: Documentation of container ports. Use -p or -P to actually publish.',
  'EXPOSE Example', 'EXPOSE 80/tcp\nEXPOSE 443/tcp\nEXPOSE 53/udp'
);

dockerTopic('docker-volume', 'VOLUME Instruction', 'intermediate', 10,
  'VOLUME creates a mount point in the image for externally mounted volumes for persistent or shared data.',
  'VOLUME declares "this directory should store data outside the container." Docker auto-creates an anonymous volume at that path. Prevents data in container writable layer.',
  'VOLUME Details', 'VOLUME /data: create mount point. Multiple volumes: VOLUME ["/var/log", "/data"]. Anonymous volume if no -v at runtime. Named volume: -v mydata:/data overrides.',
  'Use Cases', 'Database storage: VOLUME /var/lib/mysql ensures data survives restart. Log directories. File uploads. Cache directories. Shared config directories.',
  'What does VOLUME do?', 'Creates a mount point at the specified path. Data persists outside the container.',
  'Can a host path be specified in VOLUME?', 'No, VOLUME only specifies container path. Host path determined at runtime with -v.',
  'VOLUME: Declares mount points for persistent data. Override with -v or --mount.',
  'VOLUME Example', 'VOLUME /var/lib/mysql\nVOLUME ["/app/uploads", "/app/logs"]'
);

dockerTopic('docker-user', 'USER Instruction', 'intermediate', 10,
  'USER changes the user (and optionally group) for subsequent RUN, CMD, and ENTRYPOINT instructions.',
  'USER is like switching from admin to regular user. Default containers run as root (dangerous). USER appuser switches to non-root, reducing attacker capabilities.',
  'USER Details', 'USER <user> or USER <user>:<group>. User must exist before use. RUN adduser -D appuser (Alpine) or RUN useradd -m appuser (Debian).',
  'User Creation Pattern', 'RUN addgroup -S appgroup && adduser -S appuser -G appgroup (Alpine). RUN groupadd -r appgroup && useradd -r -g appgroup appuser (Debian). RUN chown -R appuser:appgroup /app. USER appuser.',
  'Why run as non-root?', 'Security: limits damage from compromise. Root in container = root on host by default.',
  'How to create a non-root user?', 'RUN adduser -D appuser (Alpine) or RUN useradd -m appuser (Debian). Then USER appuser.',
  'USER: Switch to non-root user for security. Create user before switching.',
  'USER Example', 'RUN addgroup -S myapp && adduser -S myapp -G myapp\nUSER myapp\nWORKDIR /home/myapp'
);

dockerTopic('docker-label', 'LABEL Instruction', 'beginner', 5,
  'LABEL adds metadata as key-value pairs to an image. Helps organize, document, and automate image management.',
  'LABEL is like putting a shipping label on your image. Add maintainer, version, description, source repository. Stays with the image. View with docker inspect.',
  'LABEL Details', 'LABEL <key>=<value> <key2>=<value2>. Multi-line values with backslash. View: docker inspect --format "{{json .Config.Labels}}" <image>. Filter: docker images --filter label=key=value.',
  'Common Labels', 'org.opencontainers.image.source: source repo URL. org.opencontainers.image.version: version. org.opencontainers.image.description: description. org.opencontainers.image.created: build date.',
  'What does LABEL do?', 'Adds metadata (key-value pairs) to the image. Used for organization and filtering.',
  'How to view labels on an image?', 'docker inspect <image> and check Config.Labels.',
  'LABEL: Metadata for images. OCI standardized labels. View with docker inspect.',
  'LABEL Example', 'LABEL org.opencontainers.image.source="https://github.com/org/app"\nLABEL org.opencontainers.image.version="1.0.0"'
);

dockerTopic('docker-arg', 'ARG Instruction', 'intermediate', 10,
  'ARG defines build-time variables passed to docker build using --build-arg. Only available during build, not in containers.',
  'ARG is like a configuration knob for Dockerfile builds. --build-arg VERSION=1.2.3 sets value during build. Unlike ENV, ARGs do not persist into running containers.',
  'ARG Details', 'ARG <name>[=<default>]. --build-arg <name>=<value> passes value. ARG before FROM: available in FROM (dynamic base images). ARG after FROM: available in instructions.',
  'Predefined ARGs', 'HTTP_PROXY, HTTPS_PROXY, NO_PROXY: proxy settings. BUILDPLATFORM, TARGETPLATFORM: platform args. BUILDOS, BUILDARCH, TARGETOS, TARGETARCH: OS/arch details.',
  'What is ARG used for?', 'Build-time variables: version numbers, base image tags, proxy settings.',
  'ARG vs ENV difference?', 'ARG is build-time only. ENV is both build-time and runtime.',
  'ARG: Build-time variables via --build-arg. Not in containers. Predefined ARGs for platform info.',
  'ARG Example', 'ARG NODE_VERSION=20\nFROM node:${NODE_VERSION}-alpine\nARG APP_VERSION\nRUN echo "Building version ${APP_VERSION}"'
);

dockerTopic('docker-multi-stage', 'Multi-Stage Builds (Dockerfile)', 'intermediate', 20,
  'Multi-stage builds use multiple FROM statements in one Dockerfile to separate build dependencies from the runtime image.',
  'Multi-stage builds are like a workshop separate from the final product. Build with full tools in one stage, copy only the result to slim final stage. Much smaller, more secure production images.',
  'Pattern: Compiled Languages', 'Go: stage 1 = golang:1.22 compile, stage 2 = alpine copy binary. Rust: stage 1 rust:latest, stage 2 debian:slim. Java: stage 1 maven:3.9, stage 2 eclipse-temurin:17-jre.',
  'Pattern: Interpreted Languages', 'Node: stage 1 = node:20 build, stage 2 = node:20-alpine runtime. Python: stage 1 = python:3.12 build, stage 2 = python:3.12-slim runtime.',
  'What problem do multi-stage builds solve?', 'Large image size. Build tools and source code excluded from final image. Images 5-10x smaller.',
  'How many stages can you have?', 'Any number. Common: 2-3 stages (build, test, runtime).',
  'Multi-Stage: Separate build and runtime. Smaller images. COPY --from transfers artifacts between stages.',
  'Multi-Stage Go', 'FROM golang:1.22 AS builder\nWORKDIR /app\nCOPY . .\nRUN go build -o /app/bin ./cmd\nFROM alpine:3.19\nCOPY --from=builder /app/bin /app/bin\nCMD ["/app/bin"]'
);

/* ===================== SECTION 5: Docker Compose (53-65) ===================== */

dockerTopic('docker-what-is-compose', 'What is Docker Compose?', 'beginner', 10,
  'Docker Compose is a tool for defining and running multi-container Docker applications using a YAML file.',
  'Docker Compose is like a blueprint for your multi-container app. Instead of many docker run commands, define all services in docker-compose.yml. One command: docker compose up starts everything.',
  'Compose Features', 'Single command: docker compose up starts all. Service discovery by name. Volume management. Network management. Environment variables per service. Scaling: --scale web=3. Health checks.',
  'Compose vs Docker Run', 'Compose YAML: declarative, version-controlled, reproducible. docker run: imperative, complex for multi-container apps. Compose manages networks, volumes, env, dependencies.',
  'What is Docker Compose?', 'Tool for defining and running multi-container apps with a YAML configuration file.',
  'How to start all services?', 'docker compose up (or up -d for detached mode).',
  'Docker Compose: Multi-container app definition in YAML. Service discovery, volumes, networks.',
  'Compose Up', 'docker compose up -d  # Start all services in background'
);

dockerTopic('docker-compose-yml', 'docker-compose.yml Structure', 'intermediate', 15,
  'The docker-compose.yml file defines services, networks, and volumes for a multi-container Docker application.',
  'The compose file is like a shopping list: services (containers), networks (communication), volumes (storage), and configuration.',
  'Top-Level Keys', 'services: container definitions. networks: custom networks. volumes: named volumes. configs: config files. secrets: sensitive data. Each service defines image/build, ports, env, volumes, networks.',
  'Service Definition', 'web: service name. build: . (local Dockerfile). image: nginx:latest (pre-built). ports: "8080:80". environment: NODE_ENV=production. volumes: ./data:/app/data. depends_on: db.',
  'How to define a service?', 'Under services: key with name and config: image, build, ports, environment, volumes.',
  'image vs build difference?', 'image: use pre-built from registry. build: build from Dockerfile.',
  'Compose YAML: services, networks, volumes. Each service: image/build, ports, env, volumes.',
  'Compose Skeleton', 'services:\n  web:\n    build: .\n    ports:\n      - "8080:80"\n  db:\n    image: postgres:16\n    environment:\n      POSTGRES_PASSWORD: secret'
);

dockerTopic('docker-compose-services', 'Compose Services', 'intermediate', 10,
  'Services define how each container runs: the image, configuration, dependencies, and resources.',
  'Services are characters in your app story. Each service is one container type: "web" (app), "db" (database), "cache" (Redis). Define what each does and how they connect.',
  'Service Configuration', 'image: nginx:alpine. build: ./dir. container_name: fixed name. command: override CMD. restart: always. depends_on: startup order. healthcheck: health config. profiles: conditional.',
  'Service Scaling', 'docker compose up --scale web=3: 3 replicas. Port ranges for scaled services. Networks: each replica on same network. Be careful with concurrent volume writes.',
  'How to scale a service?', 'docker compose up --scale web=3 runs 3 instances.',
  'What is depends_on for?', 'Controls startup and shutdown order between services.',
  'Compose Services: Each service = one container. Config: image, build, ports, volumes, depends_on.',
  'Service Example', 'services:\n  web:\n    build: .\n    ports: ["3000:3000"]\n  redis:\n    image: redis:7-alpine'
);

dockerTopic('docker-compose-networks', 'Compose Networks', 'intermediate', 10,
  'Docker Compose automatically creates a default network for your app, or you can define custom networks.',
  'Compose networks are like private phone lines between services. Default network connects all services. Custom networks isolate groups of services.',
  'Default Network', 'Network named <project>_default created automatically. All services join by default. Service name DNS resolution. Bridge driver (single host). Project name from directory or -p flag.',
  'Custom Networks', 'networks: webnet: driver: bridge. Service networks: web: networks: [frontend, backend]. Network isolation. External networks for pre-existing networks. Network aliases.',
  'What is the default network?', 'A bridge network named <project>_default. Services reachable by name.',
  'How to connect to multiple networks?', 'networks: [frontend, backend] under the service.',
  'Compose Networks: Default for all services. Custom for isolation. Name resolution.',
  'Network Config', 'networks:\n  frontend:\n    driver: bridge\nservices:\n  web:\n    networks: [frontend, backend]'
);

dockerTopic('docker-compose-volumes', 'Compose Volumes', 'intermediate', 10,
  'Compose volumes persist data and share files between services, defined at the top level and referenced by services.',
  'Compose volumes are like shared lockers. Define at top (volumes: dbdata:), mount in services. Multiple services can mount the same volume to share data.',
  'Top-Level Volumes', 'volumes: dbdata: (empty, Docker manages). With driver: dbdata: driver: local driver_opts:. External: dbdata: external: true (pre-existing). Default driver: local.',
  'Service Volume Mounts', 'volumes: - dbdata:/var/lib/postgresql/data (named volume). - ./data:/app/data (bind mount). - /abs/path:/container/path. :ro for read-only.',
  'How to define a named volume?', 'top-level volumes: dbdata: and in service: volumes: - dbdata:/data.',
  'How to use bind mounts in Compose?', 'volumes: - ./host/path:/container/path maps host dir into container.',
  'Compose Volumes: Named volumes (top-level) and bind mounts. Persistent data, shared between services.',
  'Volumes Config', 'volumes:\n  pgdata:\nservices:\n  db:\n    image: postgres:16\n    volumes:\n      - pgdata:/var/lib/postgresql/data'
);

dockerTopic('docker-compose-environment', 'Compose Environment', 'beginner', 10,
  'Docker Compose supports environment variables at the service level and via .env files for configuration.',
  'Environment variables let you configure services without hardcoding. Set directly in YAML, load from .env file, or use shell substitution.',
  'Setting Variables', 'environment: - NODE_ENV=production (array). environment: NODE_ENV: production (object). env_file: .env (load file). Precedence: shell > .env > defaults.',
  'Variable Substitution', '${VARIABLE}: shell-like substitution. ${VARIABLE:-default}: default if unset. ${VARIABLE:?error}: error if unset. $$ for literal dollar sign.',
  'How to set env vars in Compose?', 'environment key with key-value pairs or env_file: .env.',
  'What is variable substitution?', '${VAR} syntax replaced with shell or .env values before parsing.',
  'Compose Env: environment, env_file, variable substitution. .env file for per-env config.',
  'Env Example', 'environment:\n  NODE_ENV: production\n  DB_URL: postgres://${DB_USER}:${DB_PASS}@db:5432/myapp'
);

dockerTopic('docker-compose-depends-on', 'Depends On', 'beginner', 10,
  'depends_on expresses dependency between services, controlling startup and shutdown order.',
  'depends_on is like "start the database before the web app." Compose starts in dependency order and stops in reverse.',
  'Startup Order', 'depends_on: - db (basic). depends_on: db: condition: service_healthy (wait for health). service_started (wait to start). service_completed_successfully (wait for exit 0).',
  'Limitations', 'depends_on does NOT wait for service readiness (only started). Use condition: service_healthy with healthcheck for true readiness.',
  'What does depends_on do?', 'Controls startup and shutdown order. Does NOT wait for service readiness.',
  'How to wait for true readiness?', 'Use healthcheck and depends_on condition: service_healthy.',
  'Depends On: Dependency ordering. condition: service_started, service_healthy, service_completed_successfully.',
  'Depends On', 'services:\n  db:\n    healthcheck:\n      test: ["CMD-SHELL", "pg_isready"]\n  web:\n    depends_on:\n      db:\n        condition: service_healthy'
);

dockerTopic('docker-compose-ports', 'Compose Ports', 'beginner', 5,
  'Port mapping in Compose exposes container ports to the host, following docker run -p syntax.',
  'Ports work like docker run -p. Map host ports to container ports for external traffic. Supports ranges, protocols, long syntax.',
  'Port Syntax', '"8080:80" (HOST:CONTAINER). "8080:80/tcp" (TCP). "8080:80/udp" (UDP). "8080-8090:80-90" (ranges). Long syntax for advanced config.',
  'Expose vs Ports', 'expose: internal (linked services only). ports: external (host accessible). Use expose for internal communication, ports for external access.',
  'How to map port 3000 to 80?', 'ports: - "80:3000" under the service.',
  'What is long syntax for ports?', 'published: host port, target: container port, protocol: tcp/udp. More explicit.',
  'Compose Ports: HOST:CONTAINER mapping. expose for internal, ports for external.',
  'Ports Example', 'ports:\n  - "80:80"\n  - "443:443"\n  - "127.0.0.1:5432:5432"'
);

dockerTopic('docker-compose-build', 'Compose Build', 'intermediate', 10,
  'The build key in Compose specifies how to build a service image from a Dockerfile instead of using a pre-built image.',
  'Build config tells Compose to build from Dockerfile. Specify context (directory), Dockerfile name, build args, and options.',
  'Build Configuration', 'build: . (current dir). build: context: ./dir dockerfile: Dockerfile.prod. args: NODE_VERSION: 20. target: builder (multi-stage). cache_from: myapp:latest.',
  'Compose Build vs Image', 'build: when you have a Dockerfile. image: for pre-built images. Both: build: . image: myapp:latest (build and tag). docker compose build: build all.',
  'How to build from Dockerfile?', 'Use build: . in service definition. Compose builds on up or compose build.',
  'How to pass build args?', 'build: args: MY_VAR: value. Access with ARG in Dockerfile.',
  'Compose Build: Build from Dockerfile. Context, Dockerfile, args, target. --build flag to rebuild.',
  'Build Config', 'services:\n  web:\n    build:\n      context: .\n      dockerfile: Dockerfile.prod\n      args:\n        NODE_VERSION: 20'
);

dockerTopic('docker-compose-profiles', 'Compose Profiles', 'intermediate', 15,
  'Profiles allow selectively starting services based on the environment or use case: dev, prod, test, monitoring.',
  'Profiles are toggles for services. Services without profiles always start. Services with profiles only start with --profile flag.',
  'Profile Configuration', 'services: web: profiles: [frontend]. docker compose --profile frontend up. Multiple profiles: --profile frontend --profile debug. No profile: only unprofiled services.',
  'Use Cases', 'Development: profile: dev includes debug tools, hot-reload. Production: excludes dev tools. Monitoring: Prometheus, Grafana. Always-on: services without profiles.',
  'What are Compose profiles?', 'Labels that conditionally include services. --profile X up starts only matching services.',
  'What happens with no profile?', 'docker compose up starts only services without a profiles attribute.',
  'Compose Profiles: Conditional service activation. Useful for dev/prod separation.',
  'Profiles Example', 'services:\n  web:\n    image: nginx\n  adminer:\n    image: adminer\n    profiles: [dev]  # Only with --profile dev'
);

dockerTopic('docker-compose-extends', 'Compose Extends', 'intermediate', 10,
  'The extends keyword shares common Compose configuration across multiple services or Compose files.',
  'Extends is like inheritance. Define base config, extend in specific services. Modern alternative: include or multiple -f files.',
  'Extends Syntax', 'Service extension: serviceA: extends: service: base-service file: common.yml. Child overrides parent. Deprecated in V2 (use include instead).',
  'Modern Alternative', 'include: - common.yml (Compose V2). Multiple -f flags: docker compose -f base.yml -f dev.yml up. Override files: docker-compose.override.yml auto-included.',
  'What does extends do?', 'Imports config from another service or file. Like inheritance for Compose services.',
  'Modern alternative to extends?', 'Use include: in V2 or multiple -f flags. More predictable.',
  'Extends: Share common config across services. Include or -f for modular Compose files.',
  'Extends Example', '# common.yml\nservices:\n  base-app:\n    environment:\n      NODE_ENV: production'
);

dockerTopic('docker-compose-watch', 'Compose Watch', 'advanced', 10,
  'Compose Watch syncs file changes from host to running containers for hot-reload development.',
  'Compose Watch is like a live connection between editor and container. Edit code, changes instantly appear inside. No rebuild, no restart.',
  'Watch Configuration', 'develop: watch: - action: sync path: ./src target: /app/src (sync files). action: rebuild path: package.json (rebuild on deps change). action: sync+restart (sync and restart).',
  'Watch Actions', 'sync: one-way sync (fast, source code). rebuild: rebuild image and restart (deps change). sync+restart: sync and restart process (config files). ignore: patterns to exclude.',
  'What is Compose Watch?', 'File sync from host to running container for hot-reload. Configured under develop.watch.',
  'How to start in watch mode?', 'docker compose up --watch enables file watching and auto-sync.',
  'Compose Watch: Hot-reload development. sync (files), rebuild (deps), sync+restart (config).',
  'Watch Config', 'services:\n  web:\n    build: .\n    develop:\n      watch:\n        - action: sync\n          path: ./src\n          target: /app/src'
);

dockerTopic('docker-compose-production', 'Compose in Production', 'advanced', 20,
  'Using Docker Compose in production requires considerations for security, reliability, deployment, and orchestration.',
  'Compose in production needs: restart policies, health checks, resource limits, secrets, logging, monitoring. Compose is single-host; use Swarm or K8s for multi-host.',
  'Production Considerations', 'Remove dev-only services. restart: unless-stopped. Add healthchecks. Set resource limits (deploy.resources). Use secrets not env vars for sensitive data. Configure logging drivers. Read-only filesystem.',
  'Deployment with Compose', 'Single host: docker compose up -d (single point of failure). Docker Swarm: docker stack deploy -c compose.yml mystack. Watchtower: auto-update. CI/CD: build, push, pull, compose up.',
  'Production vs development Compose?', 'No debug services, restart policies, health checks, resource limits, secrets, proper logging.',
  'What orchestrator supports native Compose?', 'Docker Swarm: docker stack deploy -c docker-compose.yml deploys as Swarm services.',
  'Compose Production: restart, healthchecks, resource limits, secrets. Swarm for multi-host.',
  'Production Compose', 'services:\n  web:\n    image: myapp:latest\n    restart: unless-stopped\n    healthcheck:\n      test: curl -f http://localhost:3000/health\n    deploy:\n      resources:\n        limits:\n          memory: 512M'
);

/* ===================== SECTION 6: Docker Storage (66-78) ===================== */

dockerTopic('docker-volumes', 'Docker Volumes', 'intermediate', 15,
  'Volumes are the recommended way to persist data in Docker. Managed by Docker, stored in /var/lib/docker/volumes/.',
  'Docker volumes are like USB drives for containers. Survive container deletion. Managed by Docker, not host OS. Portable across systems.',
  'Volume Lifecycle', 'docker volume create my-vol: create. docker volume ls: list. docker volume inspect: details. docker volume rm: delete. docker volume prune: remove unused. docker run -v my-vol:/data mount.',
  'Volume Drivers', 'local (default): host filesystem. NFS: docker volume create --driver local --opt type=nfs. Cloud: REX-Ray (EBS), Portworx, Ceph. Third-party drivers for advanced features.',
  'What is a Docker volume?', 'Persistent storage managed by Docker. Survives container removal.',
  'How to create and use a named volume?', 'docker volume create mydata && docker run -v mydata:/app/data myapp.',
  'Volumes: Docker-managed persistent storage. Create, inspect, prune. Multiple drivers.',
  'Volume Commands', 'docker volume create myapp-data\ndocker volume inspect myapp-data\ndocker volume prune'
);

dockerTopic('docker-bind-mounts', 'Bind Mounts', 'intermediate', 10,
  'Bind mounts map a host file or directory directly into a container. Changes visible on both sides.',
  'Bind mounts are like sharing a folder with a visitor. Point to a host directory, container accesses it. Changes visible on both sides. Perfect for development.',
  'Bind Mount Syntax', 'docker run -v /host/path:/container/path:ro. --mount type=bind,source=/host/path,target=/container/path (preferred). Relative path: -v $(pwd):/app.',
  'Use Cases', 'Development: mount source code for hot-reload. Configuration: inject config files without rebuild. Logs: mount /var/log for aggregation. Docker socket: /var/run/docker.sock for DinD.',
  'What is a bind mount?', 'Maps host file/directory into container. Changes visible on both sides.',
  'Difference between -v and --mount?', '-v is shorter. --mount is more explicit. Both work; prefer --mount for clarity.',
  'Bind Mounts: Host dir to container. Development and config injection. --mount syntax preferred.',
  'Bind Mount', 'docker run -v $(pwd):/app -w /app node:20 npm start'
);

dockerTopic('docker-tmpfs-mounts', 'tmpfs Mounts', 'intermediate', 10,
  'tmpfs mounts store data in host memory only. Not written to disk. Data lost when container stops.',
  'tmpfs mounts are like whiteboards. Write temporarily, data vanishes when container stops. Faster than disk, more secure (no on-disk trace).',
  'tmpfs Syntax', 'docker run --tmpfs /app/tmp. --mount type=tmpfs,target=/app/tmp,tmpfs-size=100m. tmpfs-mode=0700 for permissions. Size limit with tmpfs-size.',
  'Use Cases', 'Session data: temporary, regeneratable. Cache: build caches. Secrets: process in-memory, no disk trace. Temporary uploads. Test databases: in-memory SQLite.',
  'What is a tmpfs mount?', 'In-memory storage. Not written to disk. Lost when container stops. Faster and more secure.',
  'When to use tmpfs?', 'Temporary, sensitive, or cache data that does not need to persist.',
  'tmpfs Mounts: In-memory, no persistence. tmpfs-size for limits. Use for cache, temp data.',
  'tmpfs Example', 'docker run --mount type=tmpfs,target=/app/cache,tmpfs-size=100m myapp'
);

dockerTopic('docker-volume-drivers', 'Volume Drivers', 'advanced', 15,
  'Volume drivers (plugins) allow Docker volumes to be stored on external systems: NFS, cloud, SSH, enterprise.',
  'Volume drivers are adapters for external storage. Store data in S3, EBS, NFS, or remote servers via SSH. Pick the driver based on where your data should live.',
  'Popular Drivers', 'local (built-in): host storage. REX-Ray: AWS EBS, GCE PD, Azure Disk. Portworx: software-defined storage. NetApp Trident: enterprise. sshfs: remote via SSH.',
  'Using Volume Drivers', 'docker volume create --driver vieux/sshfs -o sshcmd=user@host:/path. docker volume create --driver local --opt type=nfs --opt o=addr=10.0.0.1,rw --opt device=:/path.',
  'What are volume drivers?', 'Plugins extending Docker volumes to external storage: NFS, cloud, SSH, enterprise.',
  'How to use an NFS volume?', 'docker volume create --driver local --opt type=nfs --opt o=addr=server1,rw --opt device=:/path.',
  'Volume Drivers: Extend storage options. NFS, cloud (EBS, EFS), SSHFS. Plugins for enterprise storage.',
  'NFS Volume', 'docker volume create --driver local --opt type=nfs --opt o=addr=10.0.0.1,rw --opt device=:/exports/data nfs-data'
);

dockerTopic('docker-backup-restore', 'Volume Backup and Restore', 'intermediate', 15,
  'Docker volumes can be backed up and restored using temporary containers that mount the volume and archive its contents.',
  'Backing up is like packing a suitcase. Run a temp container, mount the volume, tar the contents. Restore: untar into the volume.',
  'Backup Procedure', 'docker run --rm -v myvolume:/source -v $(pwd):/backup alpine tar czf /backup/backup.tar.gz -C /source . --rm removes container. -v mounts volume and backup dir.',
  'Restore Procedure', 'docker run --rm -v myvolume:/target -v $(pwd):/backup alpine tar xzf /backup/backup.tar.gz -C /target. For databases: stop container before backup, use db-specific tools (pg_dump, mysqldump).',
  'How to backup a volume?', 'docker run --rm -v myvol:/source -v $(pwd):/backup alpine tar czf /backup/backup.tar.gz -C /source .',
  'How to restore?', 'docker run --rm -v myvol:/target -v $(pwd):/backup alpine tar xzf /backup/backup.tar.gz -C /target.',
  'Backup/Restore: Temp container + volume + tar. Backup: tar czf. Restore: tar xzf. Stop containers first.',
  'Backup Command', 'docker run --rm -v mydata:/data -v $(pwd):/backup alpine tar czf /backup/data-backup.tar.gz -C /data .'
);

dockerTopic('docker-storage-drivers', 'Storage Drivers', 'intermediate', 15,
  'Storage drivers manage how Docker stores container images and layers on the host filesystem.',
  'Storage drivers are the filesystem tech for stacking image layers. overlay2 is default. It layers filesystems: image layers read-only, container adds writable layer on top.',
  'Storage Drivers Overview', 'overlay2: default, recommended. Uses OverlayFS kernel. Good performance. aufs: legacy. devicemapper: deprecated (older RHEL). btrfs/zfs: filesystem-specific. vfs: no CoW, for testing.',
  'Choosing a Driver', 'overlay2: best for most. devicemapper: only if overlay2 unavailable. Check: docker info | grep "Storage Driver". Configure in daemon.json: "storage-driver": "overlay2".',
  'What is a storage driver?', 'Technology Docker uses to manage image layers and container filesystem. overlay2 is default.',
  'How to check the storage driver?', 'docker info | grep "Storage Driver".',
  'Storage Drivers: overlay2 (default), aufs (legacy), devicemapper (deprecated). Config in daemon.json.',
  'Check Driver', 'docker info  # Shows Storage Driver in output'
);

dockerTopic('docker-union-filesystem', 'Union File System', 'intermediate', 10,
  'Union File System overlays multiple directories (layers) to form a single coherent filesystem. Foundation of Docker image layering.',
  'UnionFS is like transparent tracing paper layers. Each image layer is a tracing paper with files. Stacked together, you see everything. overlay2 is the default UnionFS implementation.',
  'How UnionFS Works', 'Each Dockerfile instruction creates a read-only layer. Container adds thin writable layer on top. Read: search from top layer down. Write: copy-up from lower layer. Delete: whiteout file hides lower layer.',
  'overlay2 Implementation', 'Lowerdir: image layers (read-only). Upperdir: container writable layer. Merged: combined view. Supports up to 128 lower layers. Copy-on-write: file copied to upperdir on first modify.',
  'What is UnionFS?', 'Filesystem overlaying multiple directories into one unified view. Foundation of Docker layering.',
  'How does Docker handle modifications?', 'Copy-on-Write: file copied from image layer to writable layer, then modified.',
  'UnionFS: Layer stacking filesystem. Copy-on-write. overlay2 is default implementation.',
  'UnionFS', 'Lower layer: /bin, /usr, /app (read-only). Upper layer: modified files. Merged: complete filesystem.'
);

dockerTopic('docker-copy-on-write', 'Copy-on-Write', 'intermediate', 10,
  'Copy-on-Write (CoW) copies a file from a lower image layer to the writable container layer only when the file is modified.',
  'CoW is like borrowing a library book. Read without cost. To write, must buy your own copy. Saves disk and speeds container creation.',
  'How CoW Works', 'Read: from highest layer with file. First write: copy from image to writable layer (copy-up), then modify. Subsequent writes: use already-copied file. Delete: whiteout hides lower layer file.',
  'CoW Benefits', 'Disk efficiency: 100 containers from 500MB image use 500MB + 100 x small writable. Fast creation: no filesystem copy. Memory sharing: identical pages shared. Layer sharing across images.',
  'What is Copy-on-Write?', 'File copied to writable layer only on first modification. Saves disk, speeds creation.',
  'Why is CoW important?', 'Saves disk (shared layers), speeds container creation, enables layer caching.',
  'Copy-on-Write: File copied on first modification. Saves disk, enables fast creation and layer sharing.',
  'CoW Example', '100 containers from same 500MB image: ~500MB + 100 x ~1MB = ~600MB total (vs 50GB without CoW)'
);

dockerTopic('docker-layer-caching', 'Layer Caching (Storage)', 'intermediate', 15,
  'Docker layer caching reuses previously built image layers when the build context and instructions have not changed.',
  'Layer caching saves build progress. Docker checks each instruction: unchanged? Reuse cached layer. Skip expensive steps like npm install.',
  'Cache Mechanics', 'Cache key: instruction string + parent layer digest. Cache hit: skip, reuse. Cache miss: execute, create new layer. Invalidation: changed COPY files, changed RUN command, different base. All layers after miss rebuild.',
  'Optimizing Cache', 'Order by change frequency: base (rare), system deps, app deps, source code (frequent). COPY requirements.txt separately. .dockerignore exclusions. --cache-from for CI/CD.',
  'How does Docker determine a cache hit?', 'Compares instruction text and parent layer hash. COPY/ADD also hashes file contents.',
  'How to optimize for caching?', 'Place infrequently changed instructions first. Copy dependency files separately.',
  'Layer Caching: Reuse unchanged layers. Order by change frequency. COPY deps separately.',
  'Cache-Optimized Dockerfile', 'FROM node:20\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nCMD ["node", "app.js"]'
);

dockerTopic('docker-volume-vs-bind', 'Volume vs Bind Mount', 'intermediate', 10,
  'Volumes are Docker-managed. Bind mounts map arbitrary host paths. Volumes are preferred for production.',
  'Think of volumes as Docker internal storage and bind mounts as sharing a host folder. Volumes are preferred: Docker manages them, portable, work on remote hosts.',
  'Comparison', 'Management: Volumes = Docker, Bind = user. Location: Volumes = /var/lib/docker/volumes/, Bind = any path. Backup: Volumes = temp container, Bind = direct. Portability: Volumes = cross-system, Bind = path-dependent.',
  'When to Use Each', 'Volumes for: persistent app data, production, backup/restore, sharing between containers. Bind mounts for: development (source code), config injection, Docker socket, logs. tmpfs for temp data.',
  'Volume vs bind mount?', 'Volumes Docker-managed (/var/lib/docker/volumes/). Bind mount maps arbitrary host paths. Volumes preferred.',
  'When to use bind mounts?', 'Development (hot-reload), config injection, Docker socket access, host logs.',
  'Volumes vs Bind: Volumes = managed, portable, preferred. Bind = host paths, dev/config. tmpfs = in-memory.',
  'Volume vs Bind', '# Volume (preferred)\ndocker run -v mydata:/data myapp\n# Bind mount\ndocker run -v /host/path:/data myapp'
);

dockerTopic('docker-nfs-volumes', 'NFS Volumes', 'advanced', 15,
  'NFS (Network File System) volumes allow Docker containers to access shared storage across a network.',
  'NFS volumes are shared network drives for containers. Multiple containers on different hosts access the same storage. Essential for stateful clustered apps.',
  'Creating NFS Volumes', 'docker volume create --driver local --opt type=nfs --opt o=addr=10.0.0.1,rw --opt device=:/path/to/share nfs-volume. Options: addr=server-ip, rw/ro, hard/soft, timeo=600.',
  'NFS in Compose', 'volumes: nfs-data: driver: local driver_opts: type: nfs o: addr=nfs-server,rw device: :/exports/data. Multi-host: enables shared storage across Swarm or K8s nodes.',
  'What is an NFS volume?', 'Docker volume on a remote NFS server. Multiple containers on different hosts access same storage.',
  'How to create an NFS volume?', 'docker volume create --driver local --opt type=nfs --opt o=addr=10.0.0.1,rw --opt device=:/exports/data.',
  'NFS Volumes: Network shared storage. Multi-host data sharing. NFS driver options.',
  'NFS Volume Create', 'docker volume create --driver local --opt type=nfs --opt o=addr=192.168.1.100,rw --opt device=:/mnt/data shared-data'
);

dockerTopic('docker-volume-plugins', 'Volume Plugins', 'advanced', 10,
  'Volume plugins extend Docker volumes to work with external storage systems: cloud, enterprise, third-party.',
  'Volume plugins are adapters for Docker storage. Need EBS? Plugin. Need replication? Plugin. They let Docker use storage beyond the local driver.',
  'Installing Plugins', 'docker plugin install <plugin> (e.g., rexray/ebs). docker plugin ls: list. enable/disable: manage. Discovery via Docker Hub or vendor docs.',
  'Using Volume Plugins', 'docker volume create -d rexray/ebs --name myvolume --opt size=10. Compose: driver: rexray/ebs driver_opts: size: 10. Backup plugins handle snapshotting.',
  'What are volume plugins?', 'Extensions enabling Docker volumes on external storage: cloud, enterprise, SSH, NFS.',
  'How to install a volume plugin?', 'docker plugin install <plugin-name>.',
  'Volume Plugins: Extend storage to external systems. Install from Docker Hub. Driver options for config.',
  'Install Plugin', 'docker plugin install rexray/ebs  # AWS EBS volume plugin'
);

dockerTopic('docker-storage-best-practices', 'Storage Best Practices', 'intermediate', 10,
  'Storage best practices cover volume management, backup strategies, driver selection, and performance optimization.',
  'Best practices: use named volumes for production, backup regularly, choose the right storage driver, avoid bind mounts in production, use tmpfs for temp data.',
  'Volume Management', 'Use named volumes (not anonymous). Label volumes for identification. Prune unused volumes regularly. Use volume drivers for multi-host. Set ownership with --chown.',
  'Performance Tips', 'Use overlay2 storage driver for best performance. Avoid devicemapper. Use SSD storage for volume data. Monitor disk usage. Set log rotation limits (--log-opt max-size=10m max-file=3).',
  'Best practices for Docker storage?', 'Named volumes, regular backup, overlay2 driver, tmpfs for temp, avoid production bind mounts.',
  'How to optimize storage performance?', 'Use overlay2 driver, SSD storage, log rotation, prune unused objects.',
  'Storage Best Practices: Named volumes, overlay2, backup, tmpfs for temp, log rotation.',
  'Log Rotation', 'docker run --log-opt max-size=10m --log-opt max-file=3 myapp'
);

/* ===================== SECTION 7: Docker Networking (79-91) ===================== */

dockerTopic('docker-bridge-network', 'Bridge Network', 'intermediate', 15,
  'The bridge network is the default Docker network. Containers on the same bridge communicate via IP addresses.',
  'Bridge network is like a private LAN for containers on one host. Containers get IPs on 172.17.0.0/16. They can talk to each other but not to containers on other bridges.',
  'Default Bridge', 'Created automatically as docker0. Containers get IPs from 172.17.0.0/16. Communicate via IP (not DNS). Port publishing (-p) required for external access. docker network inspect bridge for details.',
  'User-Defined Bridge', 'docker network create mynet creates custom bridge. Better isolation. DNS resolution by container name. Connect/disconnect containers dynamically. Each user-defined bridge has its own subnet.',
  'What is the bridge network?', 'Default Docker network. Private internal network on host. Containers on bridge communicate by IP.',
  'Default vs user-defined bridge?', 'Default: no DNS by name, all containers. User-defined: DNS by name, custom subnet, better isolation.',
  'Bridge Network: Default docker network. User-defined for better isolation and DNS.',
  'Create Bridge', 'docker network create --driver bridge mynet\ndocker run --network=mynet nginx'
);

dockerTopic('docker-host-network', 'Host Network', 'intermediate', 10,
  'Host network mode makes the container share the host network stack directly, with no network isolation.',
  'Host networking removes the network barrier between container and host. Container uses host IP and ports directly. Best performance but no isolation. Use for network-sensitive apps.',
  'Host Network Details', '--network=host: container shares host network. No port mapping needed (container port = host port). Fastest performance. No network namespace isolation. Limited to single host.',
  'When to Use Host', 'Performance-critical apps (latency-sensitive). Network monitoring tools (need host interfaces). Applications that manage their own ports. Single-host deployments where isolation is not needed.',
  'What is host network mode?', 'Container shares host network stack. No isolation, best performance, no port mapping needed.',
  'When to use host networking?', 'Performance-critical apps, network monitoring, when port mapping overhead is unacceptable.',
  'Host Network: Share host network stack. Maximum performance, no isolation. Use for performance-sensitive apps.',
  'Host Mode', 'docker run --network=host nginx  # No -p needed, uses host port 80'
);

dockerTopic('docker-overlay-network', 'Overlay Network', 'advanced', 20,
  'Overlay networks enable multi-host communication for Docker Swarm services, spanning containers across multiple nodes.',
  'Overlay network is like a VPN connecting containers across different machines. Containers on node A can talk to containers on node B as if they were on the same network. Requires Swarm mode.',
  'How Overlay Works', 'Uses VXLAN tunneling to encapsulate traffic. Each container gets an IP on the overlay subnet. Traffic between nodes encrypts automatically. Built-in DNS across the cluster. Load balancing for services.',
  'Creating Overlay Networks', 'Swarm mode required: docker swarm init. Create: docker network create -d overlay my-overlay. For standalone containers: --attachable flag. docker service create --network my-overlay nginx.',
  'What is an overlay network?', 'Multi-host network for Swarm services. Containers on different hosts communicate as if on same network.',
  'What does overlay use for encapsulation?', 'VXLAN tunneling. Traffic encrypted between nodes.',
  'Overlay Network: Multi-host networking. VXLAN tunnels. Swarm mode required. Built-in DNS and load balancing.',
  'Overlay Create', 'docker network create -d overlay --attachable my-overlay'
);

dockerTopic('docker-macvlan-network', 'Macvlan Network', 'advanced', 20,
  'Macvlan assigns MAC addresses to containers, making them appear as physical devices on the network.',
  'Macvlan gives each container its own MAC address, like plugging each container directly into the physical network. Containers get IPs from your LAN DHCP. Useful for legacy apps needing direct network access.',
  'How Macvlan Works', 'Each container gets a unique MAC address. Docker assigns IP from the physical subnet. Containers appear as separate physical devices. Performance is near-native (no port mapping). Requires the host interface to be in promiscuous mode.',
  'Macvlan Config', 'docker network create -d macvlan --subnet=192.168.1.0/24 --gateway=192.168.1.1 -o parent=eth0 macnet. Containers get IPs from 192.168.1.0/24. Parent specifies the physical interface.',
  'What is macvlan?', 'Assigns MAC addresses to containers. Each container appears as a physical device on the network.',
  'When to use macvlan?', 'Legacy apps needing direct network access, performance-critical apps, container needing own IP on LAN.',
  'Macvlan: Each container gets own MAC. Direct LAN access. Near-native performance. No port mapping needed.',
  'Macvlan Create', 'docker network create -d macvlan --subnet=192.168.1.0/24 -o parent=eth0 macnet'
);

dockerTopic('docker-none-network', 'None Network', 'beginner', 5,
  'None network mode disables all networking for a container. Container has no network interfaces except loopback.',
  'None network is like putting a container in a soundproof room with no phone. Good for high-security offline processing or batch jobs that do not need network access.',
  'None Network Details', '--network=none: no network interfaces (only lo). No external communication. No internal communication. Maximum isolation. Minimal attack surface.',
  'Use Cases', 'Security-sensitive batch processing. Offline computation. Air-gapped workloads. Compile jobs that should not access network. Testing network-disconnected scenarios.',
  'What is none network?', 'Disables all networking. Container has only loopback interface.',
  'When to use none network?', 'High-security workloads, offline processing, air-gapped tasks, network-disconnected testing.',
  'None Network: No network interfaces. Maximum isolation. For high-security offline tasks.',
  'None Mode', 'docker run --network=none myapp  # No network access at all'
);

dockerTopic('docker-port-publishing', 'Port Publishing', 'intermediate', 10,
  'Port publishing makes container ports accessible from outside the host using iptables NAT rules.',
  'Port publishing is like opening doors in the firewall. -p 8080:80 says "any traffic on host port 8080 goes to container port 80." Without it, containers are isolated.',
  'Publishing Methods', '-p 8080:80 (TCP). -p 8080:80/udp (UDP). -p 127.0.0.1:8080:80 (bind to localhost only). -p 8080:80 -p 8443:443 (multiple). -P (all exposed ports to random high ports).',
  'Port Publishing Details', 'Uses iptables DNAT rules. Host port must be unique. Container port can repeat. docker port <container> shows mappings. Published ports checked with docker ps or docker port.',
  'How to publish a port?', '-p <host-port>:<container-port> on docker run.',
  'What does -P do?', 'Publishes all EXPOSEd ports to random high-numbered host ports.',
  'Port Publishing: iptables NAT forwarding. -p for specific ports, -P for all exposed.',
  'Publish Example', 'docker run -d -p 8080:80 -p 127.0.0.1:443:443 nginx'
);

dockerTopic('docker-dns', 'DNS in Docker', 'intermediate', 10,
  'Docker provides built-in DNS resolution for containers. Containers can resolve other containers by name on user-defined networks.',
  'Docker has a built-in DNS server at 127.0.0.11. On user-defined networks, containers resolve each other by container name. This enables service discovery without external DNS.',
  'DNS Configuration', 'Default: Google DNS (8.8.8.8, 8.8.4.4) for external resolution. Custom DNS: --dns <ip>. Search domains: --dns-search <domain>. DNS options: --dns-opt. /etc/hosts managed by Docker.',
  'Service Discovery', 'User-defined networks: container name resolves to container IP. Compose: service name resolves. Swarm: service name resolves to VIP (virtual IP) for load balancing. /etc/hosts updated automatically by Docker.',
  'What is the built-in Docker DNS?', '127.0.0.11. Resolves container names on user-defined networks.',
  'How do containers discover each other?', 'By container name on user-defined networks. Docker DNS resolves names to IPs.',
  'Docker DNS: Built-in DNS at 127.0.0.11. Name resolution on user-defined networks. Service discovery.',
  'Custom DNS', 'docker run --dns 1.1.1.1 --dns-search example.com nginx'
);

dockerTopic('docker-network-drivers', 'Network Drivers', 'intermediate', 15,
  'Docker network drivers determine how containers communicate: bridge (single host), overlay (multi-host), host, macvlan, none.',
  'Network drivers are like different types of roads. Bridge = local roads (single host). Overlay = highways between cities (multi-host). Host = direct access (no speed limits). Macvlan = each car has own license plate.',
  'Driver Overview', 'bridge: default, private network on host. host: share host network, no isolation. overlay: multi-host via VXLAN. macvlan: MAC address per container. none: no networking. ipvlan: like macvlan but using the same MAC.',
  'Choosing a Driver', 'bridge: single-host apps, default choice. overlay: multi-host Swarm services. host: performance-critical, no isolation needed. macvlan: legacy apps needing LAN access, IP-per-container. none: offline security workloads.',
  'What network drivers does Docker support?', 'bridge, host, overlay, macvlan, none, ipvlan.',
  'Which driver for multi-host?', 'overlay for Swarm multi-host networking across nodes.',
  'Network Drivers: bridge (single), host (no isolation), overlay (multi-host), macvlan (MAC per container).',
  'Network Drivers', 'docker network ls  # List all networks\nDrivers: bridge, host, overlay, macvlan, none'
);

dockerTopic('docker-custom-networks', 'Custom Networks', 'intermediate', 10,
  'Custom networks provide better isolation, DNS resolution by name, and configurable subnets and gateways.',
  'Custom networks are like creating your own private VLANs. You control the subnet, gateway, and which containers join. Containers on different custom networks are isolated from each other.',
  'Creating Custom Networks', 'docker network create --driver bridge --subnet 10.5.0.0/16 --gateway 10.5.0.1 mynet. Create with custom IP range. Connect containers: docker network connect mynet container1. Disconnect: disconnect.',
  'Network Features', 'Isolation: containers on different nets cannot communicate. DNS: resolve by name on same net. IPAM: control IP allocation. Attachable: standalone containers can join. Internal: no external access.',
  'Why use custom networks?', 'Better isolation than default bridge, DNS by name, custom subnet, connect/disconnect containers.',
  'How to create a custom network?', 'docker network create --driver bridge --subnet 10.5.0.0/16 mynet.',
  'Custom Networks: Isolation, DNS, custom subnets. Connect/disconnect containers dynamically.',
  'Custom Network', 'docker network create app-net\ndocker network connect app-net web\ndocker network connect app-net db'
);

dockerTopic('docker-container-communication', 'Container Communication', 'intermediate', 15,
  'Containers communicate via networks: same bridge (IP/name), different bridges (need connect), or multi-host (overlay).',
  'Container communication is like setting up phone lines. Same network: dial by name. Different networks: need operator (connect). Different hosts: need VPN (overlay).',
  'Communication Patterns', 'Same bridge: by container name (user-defined) or IP (default). Different bridge: docker network connect container to other net. Multi-host: overlay network. External: port publishing. Docker Compose: automatic same network.',
  'Network Security', 'Isolation: separate networks prevent unwanted communication. Firewall: iptables rules limit traffic. TLS: encrypt daemon communication. App-level: mTLS between services for zero-trust.',
  'How do containers on same network communicate?', 'By container name (user-defined bridge) or IP address (default bridge).',
  'How to connect containers on different networks?', 'docker network connect <network> <container> to add container to another network.',
  'Container Communication: Same network by name. Different networks via connect. Multi-host via overlay.',
  'Cross-Network', 'docker network connect mynet website-db  # Connect db to web network'
);

dockerTopic('docker-network-security', 'Network Security', 'advanced', 15,
  'Docker network security involves isolation, encryption, firewall rules, and best practices for container communication.',
  'Network security is like securing a building. Different floors (networks) have different access. Some doors open (ports), some locked. Security between networks is enforced by Docker firewall rules.',
  'Security Measures', 'Network isolation: separate networks prevent unwanted access. Firewall: iptables rules managed by Docker. TLS: encrypt daemon remote API. User-defined bridges: better isolation than default. Internal networks: no external gateway.',
  'Best Practices', 'Use user-defined networks (not default bridge). Isolate tiers: frontend, backend, database on separate networks. Use internal networks for databases (no external access). Encrypt overlay traffic. Drop unnecessary capabilities. Never expose Docker socket.',
  'How to isolate database containers?', 'Put database on an internal network: docker network create --internal db-net. No external access.',
  'How to encrypt overlay traffic?', 'Docker Swarm overlay networks encrypt by default. Use --opt encrypted for user-defined overlays.',
  'Network Security: Isolation, encryption, iptables, internal networks. Separate tiers, encrypt overlay traffic.',
  'Internal Network', 'docker network create --internal db-net  # No external access\ndocker run --network=db-net postgres'
);

dockerTopic('docker-ingress-network', 'Ingress Network', 'advanced', 10,
  'The ingress network in Docker Swarm handles load balancing and routing for published service ports across all nodes.',
  'Ingress is like a traffic cop for your Swarm cluster. When you publish a service port, ingress makes it accessible on any Swarm node. Traffic is automatically load-balanced to service tasks.',
  'Ingress Details', 'Created automatically in Swarm mode. docker network ls shows ingress. Routed mesh: published port accessible on all Swarm nodes. Load balancing: distributes traffic to service replicas. HTTP-level routing with labels.',
  'Ingress Configuration', 'Default ingress network is created on swarm init. Customize: docker network create -d overlay --ingress custom-ingress. Publish mode: --publish published=80,target=80,mode=ingress (default) or mode=host (no load balancing).',
  'What is ingress network?', 'Swarm mesh routing network. Published ports accessible on any Swarm node with load balancing.',
  'How does ingress load balance?', 'Built-in routing mesh distributes incoming traffic across service tasks (replicas) using IPVS.',
  'Ingress Network: Swarm mesh routing. Published ports on all nodes. Automatic load balancing.',
  'Ingress Info', 'docker network ls  # Shows ingress network in Swarm mode'
);

dockerTopic('docker-network-troubleshooting', 'Network Troubleshooting', 'intermediate', 15,
  'Docker network troubleshooting involves checking connectivity, inspecting network config, and using diagnostic tools.',
  'Network troubleshooting is like being a network detective. Check if containers can reach each other (ping), verify port mappings (docker port), inspect network config (docker network inspect), and check DNS resolution.',
  'Common Issues', 'Container cannot reach another: check same network membership. Port not accessible: verify port mapping with docker port. DNS not resolving: use user-defined bridge, not default. Network not found: docker network ls to verify.',
  'Troubleshooting Tools', 'docker network inspect <net>: detailed config. docker exec <container> ping <other>: test connectivity. docker exec <container> nslookup <name>: test DNS. docker logs: check app errors. docker events: real-time network events.',
  'How to check if containers are on the same network?', 'docker network inspect <network> shows all connected containers.',
  'How to test container connectivity?', 'docker exec <container> ping <other-container-name>.',
  'Network Troubleshooting: docker network inspect, ping, nslookup, docker port, docker events.',
  'Test Connectivity', 'docker exec web ping db  # Test network connectivity between containers'
);

/* ===================== SECTION 8: Containerization (92-94) ===================== */

dockerTopic('docker-containerization-best-practices', 'Containerization Best Practices', 'intermediate', 15,
  'Containerization best practices cover image optimization, security, application design, and operational considerations.',
  'Best practices for containerizing apps: small images, single concern per container, stateless, health checks, resource limits, non-root user, read-only filesystem.',
  'Image Best Practices', 'Use specific base image tags. Minimize layers. Multi-stage builds. Scan for vulnerabilities. Use .dockerignore. Label images. Pin package versions. Clean package caches in same RUN.',
  'Application Design', 'Single process per container (one concern). Stateless: store state in volumes/db. Health checks for orchestration. Graceful shutdown (handle SIGTERM). Log to stdout/stderr. Twelve-factor app principles. Configuration via env vars.',
  'What are containerization best practices?', 'Small images, single process, stateless, health checks, resource limits, non-root, read-only FS.',
  'How should apps handle shutdown?', 'Handle SIGTERM signal for graceful shutdown. Docker stop sends SIGTERM before SIGKILL.',
  'Containerization Best Practices: Single process, stateless, health checks, resource limits, non-root user, small images.',
  'Graceful Shutdown', '// In Node.js\nprocess.on("SIGTERM", () => { server.close(() => process.exit(0)) })'
);

dockerTopic('docker-application-containerization', 'Application Containerization', 'intermediate', 20,
  'Containerizing an application involves creating a Dockerfile, optimizing the image, defining Compose for multi-service, and setting up CI/CD.',
  'Containerizing an app is like packing it for a trip. You create a Dockerfile (packing list), optimize size (travel light), add Compose (itinerary), and set up CI/CD (automatic travel agent).',
  'Containerization Steps', '1. Write Dockerfile with appropriate base. 2. Use multi-stage builds. 3. Add .dockerignore. 4. Set up docker-compose.yml for services. 5. Use env vars for config. 6. Add health checks. 7. Set resource limits. 8. Run as non-root. 9. Set up CI/CD to build and push. 10. Deploy with Compose or orchestration.',
  'CI/CD Pipeline', 'Build image on every commit. Tag with commit SHA. Push to registry. Deploy to staging. Run integration tests. Promote to production. Use Docker layer caching for fast builds. Automate security scanning.',
  'Steps to containerize an app?', 'Dockerfile, multi-stage, .dockerignore, docker-compose, env vars, health checks, non-root, CI/CD.',
  'How to optimize containerization?', 'Alpine base, multi-stage, minimize layers, .dockerignore, use build cache, scan for vulnerabilities.',
  'Application Containerization: Dockerfile, multi-stage, Compose, CI/CD. Automate build, test, and deploy.',
  'Containerization CI/CD', '# .github/workflows/docker.yml\non: [push]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: docker build -t myapp:${{ github.sha }} .\n      - run: docker push myapp:${{ github.sha }}'
);

/* Complete CI/CD Pipeline with Docker */
compactTopic('docker-complete-cicd', 'Complete CI/CD Pipeline with Docker', 'advanced', 45,
  ['A complete Docker CI/CD pipeline covers the full lifecycle: code commit, image build, security scan, push to registry, deploy, monitor, and rollback.', 'The pipeline uses GitHub Actions or Jenkins to build Docker images with layer caching, scan for vulnerabilities, push to registry, deploy containers, and verify health.', 'Key components: Dockerfile with multi-stage builds, Docker Compose for local dev, CI/CD for automated builds, container registry, deployment automation, health checks, monitoring.', 'Docker layer caching in CI/CD reduces build times by 50-80%. Each build produces a tagged image that is traceable to a Git commit for audit and rollback.', 'The entire pipeline is defined as code: Dockerfile, docker-compose.yml, CI/CD config, and deployment scripts are version-controlled together.'],
  'A complete Docker CI/CD pipeline is like an automated factory for building and shipping container images. When a developer pushes code, the pipeline automatically: builds the Docker image with layer caching, scans for vulnerabilities with Docker Scout, pushes the image to a registry, deploys to staging, runs smoke tests, and after approval, deploys to production with zero-downtime rolling updates.',
  [dd('Pipeline Stages', 'The pipeline has these stages: Checkout (code from Git), Build (docker build with cache), Security Scan (Docker Scout or Trivy), Push to Registry (Docker Hub, ECR, GCR), Deploy Staging (docker compose up or kubectl), Smoke Tests (verify endpoints), Approve Production (manual gate), Deploy Production (rolling update), Health Check (verify deployment), Notify (Slack/email).'),
   dd('Build Optimization', 'Layer caching is critical in CI/CD: use docker build --cache-from to reuse layers from previously built images. Order Dockerfile for maximum cache: base image, system deps, app deps, source code. Use GitHub Actions cache action or Jenkins Docker cache plugin. Multi-stage builds keep final images small. Build only what changed (monorepo: build only affected services).'),
   dd('Deployment Strategies', 'Rolling update: gradually replace old containers with new ones (zero-downtime). Blue-Green: run old and new simultaneously, switch traffic. Canary: route small % of traffic to new version, monitor, then full rollout. Docker Compose: docker compose up -d with new image tag. Kubernetes: kubectl set image with rolling update strategy.'),
   dd('Monitoring & Rollback', 'Container health checks (HEALTHCHECK) verify app readiness. Log monitoring: docker logs or centralized logging. Metric monitoring: Prometheus/Grafana for container metrics. Rollback: docker compose up -d with previous image tag or kubectl rollout undo. Automated rollback on health check failure.'),
   dd('Complete CI/CD Workflow', 'The CI/CD workflow file defines the entire pipeline. Each step is a discrete action. Secrets (registry credentials, cloud keys) are securely injected. Image tags include commit SHA and build number for full traceability. Notifications alert the team on pipeline status. All code is in version control for auditability.')],
  [q('What are the main stages of a Docker CI/CD pipeline?', 'Checkout, Build (with cache), Security Scan, Push to Registry, Deploy Staging, Smoke Tests, Approve Prod, Deploy Production, Health Check, Notify.'),
   q('How is layer caching used in CI/CD?', 'docker build --cache-from <previous-image> reuses cached layers. Dockerfile order optimized for cache. CI cache actions persist layers between builds.')],
  T(10,15,160,22,'#6f42c1','','Code Commit','Git push triggers pipeline') +
  A(170,26,185,26) +
  R(195,5,140,22,'#0070f3','','Docker Build','Layer caching, multi-stage') +
  A(335,16,350,16) +
  R(195,30,140,22,'#28a745','','Security Scan','Docker Scout/Trivy') +
  A(335,41,350,41) +
  R(195,55,140,22,'#ffc107','','Push Registry','Docker Hub, ECR, GCR') +
  A(335,66,350,66) +
  R(195,80,140,22,'#dc3545','','Deploy Staging','docker compose up') +
  A(335,91,350,91) +
  R(195,105,140,22,'#20c997','','Smoke Tests','Health check endpoints') +
  A(335,116,350,116) +
  R(195,130,140,22,'#fd7e14','','Approve Prod','Manual approval gate') +
  A(335,141,350,141) +
  R(195,155,140,22,'#e83e8c','','Deploy Production','Rolling update, zero-downtime') +
  T(100,195,'Complete Docker CI/CD Pipeline: Code -> Build -> Scan -> Push -> Stage -> Test -> Approve -> Prod -> Notify. Every step automated with security and governance.',9,'#666','middle'),
  [e('Complete CI/CD Workflow', 'Full GitHub Actions workflow for Docker CI/CD.', codeBlock(['name: Docker CI/CD Pipeline', '', 'on:', '  push:', '    branches: [main]', '', 'env:', '  REGISTRY: ghcr.io', '  IMAGE_NAME: myapp', '', 'jobs:', '  build-and-deploy:', '    runs-on: ubuntu-latest', '    steps:', '      - uses: actions/checkout@v4', '', '      - name: Set up Docker Buildx', '        uses: docker/setup-buildx-action@v3', '', '      - name: Cache Docker layers', '        uses: actions/cache@v4', '        with:', '          path: /tmp/.buildx-cache', '          key: $\{\{ runner.os \}\}-buildx-$\{\{ hashFiles(\"**/package-lock.json\") \}\}', '          restore-keys: $\{\{ runner.os \}\}-buildx-', '', '      - name: Login to Registry', '        uses: docker/login-action@v3', '        with:', '          registry: $\{\{ env.REGISTRY \}\}', '          username: $\{\{ github.actor \}\}', '          password: $\{\{ secrets.GITHUB_TOKEN \}\}', '', '      - name: Build and push', '        uses: docker/build-push-action@v5', '        with:', '          context: .', '          push: true', '          tags: $\{\{ env.REGISTRY \}\}/$\{\{ env.IMAGE_NAME \}\}:$\{\{ github.sha \}\},$\{\{ env.REGISTRY \}\}/$\{\{ env.IMAGE_NAME \}\}:latest', '          cache-from: type=local,src=/tmp/.buildx-cache', '          cache-to: type=local,dest=/tmp/.buildx-cache', '', '      - name: Scan image', '        run: docker scout quickview $\{\{ env.REGISTRY \}\}/$\{\{ env.IMAGE_NAME \}\}:$\{\{ github.sha \}\}', '', '      - name: Deploy to staging', '        run: |', '          docker compose -f docker-compose.staging.yml up -d', '          docker compose -f docker-compose.staging.yml exec -T app ./health-check.sh', '', '      - name: Deploy to production', '        if: github.ref == \"refs/heads/main\"', '        run: |', '          docker service update --image $\{\{ env.REGISTRY \}\}/$\{\{ env.IMAGE_NAME \}\}:$\{\{ github.sha \}\} myapp_web', '          sleep 10', '          curl -f http://app.example.com/health || (docker service rollback myapp_web && exit 1)', '', '      - name: Notify', '        if: always()', '        run: echo "Pipeline completed with status $\{\{ job.status \}\}"']), 'Complete GitHub Actions workflow for Docker CI/CD with layer caching, security scanning, staging deploy, production rolling update with health check and auto-rollback.')],
  [m('What does docker build --cache-from do?', ['Skips Dockerfile entirely', 'Uses a previously built image as cache source for faster builds', 'Downloads from registry only', 'Disables all caching'], 1, '--cache-from tells Docker to use a previously built image as a cache source, making subsequent builds faster by reusing unchanged layers.'), m('What is the purpose of the health check step after deployment?', ['Deploy faster', 'Verify the new version is working correctly, triggering rollback on failure', 'Build the image', 'Scan for vulnerabilities'], 1, 'The health check verifies the deployment is working. If it fails, the pipeline rolls back to the previous version automatically, ensuring zero-downtime deployments.'), m('What deployment strategy gradually replaces old containers with new ones?', ['Blue-Green', 'Canary', 'Rolling update', 'Recreate'], 2, 'Rolling update gradually replaces old containers with new ones, maintaining service availability throughout the process.'), m('What is the benefit of Docker layer caching in CI/CD?', ['Slower builds', 'Reduces build time by reusing unchanged layers', 'Larger images', 'More disk usage'], 1, 'Layer caching reuses unchanged image layers from previous builds, reducing build time by 50-80% and saving bandwidth.'), m('What does the docker scout quickview command do?', ['Builds the image', 'Scans the image for vulnerabilities', 'Pushes to registry', 'Deploys the image'], 1, 'Docker Scout quickview scans the image for known vulnerabilities (CVEs) and provides a summary of security issues.')]
);

// ---- PAD TOPICS ----
var padTopics = require("../pad-topics");
padTopics(topics);

// ---- GENERATE ----
var dataDir = __dirname;
var lines = [];
lines.push("var TOPICS_DATA = TOPICS_DATA || {};");
lines.push("TOPICS_DATA[\"docker\"] = TOPICS_DATA[\"docker\"] || {};");
for (var id in topics) {
  lines.push("TOPICS_DATA[\"docker\"][\"" + id + "\"] = " + JSON.stringify(topics[id]) + ";");
}
fs.writeFileSync(dataDir + "/topics-data.js", lines.join("\n"));
fs.writeFileSync(dataDir + "/topics.json", JSON.stringify({ topics: topicList }, null, 2));
console.log("Generated Docker topics: " + Object.keys(topics).length);
