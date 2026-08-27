---
sidebar_position: 6
title: "Workloads & Images"
---

# Workloads and container images

Configuration tells you how a resource is set up. It says nothing about what is
running inside it. Armor looks inside two ways — neither of which requires you
to install anything of ours on the workload.

## Seeing inside a virtual machine

Armor reads the software inventory your cloud provider already collects:

| Provider | Source |
|---|---|
| **AWS** | Systems Manager inventory — every instance with the SSM agent, which most estates already run for patching |
| **Azure** | The virtual machine's instance view and patch assessment |
| **Google Cloud** | OS Config inventory |

Where the Zpoa agent is installed, Armor uses that instead — it sees more,
including which processes are actually running.

### Coverage is a number, not an assumption

The important part is what happens to the instances none of those sources
reaches. They are counted as **unexamined**, and they appear in the coverage
figure with the reason:

> 412 instances · 180 via agent · 190 via cloud inventory · **42 unexamined**
>
> Why: 39 have no Systems Manager agent registered · 3 have not checked in

An unexamined host is never reported as clean. If you have ever been handed a
"no vulnerabilities found" that turned out to mean "we could not look", this is
the number that prevents it.

Ask *"how much of our estate can you see inside"* to get it.

## Scanning container images

Armor already knows every image reference running in your Kubernetes clusters.
It now opens them.

For each image it pulls the manifest and layers and reads the package databases
inside — Debian, Ubuntu and Alpine packages, plus application dependencies from
`package-lock.json`, `requirements.txt`, `go.mod` and `Gemfile.lock`. The result
is a **software bill of materials** for the image.

Images are identified by digest, so:

- A hundred pods sharing an image are scanned once.
- A tag that moves is a different image, and gets its own scan.

Supported registries: Amazon ECR, Azure Container Registry, Google Artifact
Registry, Docker Hub, Harbor, and anything else speaking the standard registry
protocol. Public images need no credentials.

### When an image cannot be fully read

Some images use a package database Armor does not parse — Red Hat family images
are the common case. Those are reported with the gap stated on the image, rather
than as an image with no packages. Same rule as everywhere else: "we could not
read it" and "there is nothing there" must never look alike.

## Vulnerabilities

Every package Armor finds — on a host or in an image — is matched against public
vulnerability data, using each ecosystem's own version rules. A Debian epoch and
an Alpine release suffix are not semantic versions, and comparing them as though
they were is how a scanner tells you that you are patched when you are not.

Each match carries four things, kept separate so you can argue with the ranking:

- **Severity and CVSS** — what the advisory says in the abstract
- **EPSS** — the published probability that this vulnerability gets exploited
- **Known exploited** — whether it is on CISA's actively-exploited list
- **Reachability** — whether the thing carrying it can be reached at all
- **In use** — whether the vulnerable package is actually loaded, where the
  agent has observed the running processes

A vulnerability in a package nothing loads, on an instance nothing can reach, is
not a critical. Saying so is the single biggest reduction in noise available —
and where the runtime was never observed, Armor says **not observed** rather
than quietly assuming it is idle.

Anything on the known-exploited list keeps a high priority regardless of the
arithmetic. It is being used against people today.

## Secrets

While reading a workload, Armor checks the places credentials actually end up:

- EC2 user-data and cloud-init scripts
- Lambda environment variables
- Kubernetes ConfigMaps and container environment
- Credential files inside image layers
- Terraform and GitHub Actions workflows

A finding tells you the type of credential, exactly where it is, and the first
few characters so you can identify it. **The credential itself is never
stored.** A scanner that kept what it found would concentrate every credential
in your estate into one place, which is a worse outcome than the leak.

## Malware and crypto-miners

The same pass checks for the things that are unambiguously bad in a cloud
workload: mining-pool addresses and miner binaries, reverse shells, payloads
fetched and executed in one step, keys appended to `authorized_keys`, and
instance credentials piped out of the metadata service.

Every hit names the specific check that fired and shows the line that matched.
This is not an antivirus and does not claim to be — it will not tell you an
image is clean. It tells you when something specific and recognisable is there.
