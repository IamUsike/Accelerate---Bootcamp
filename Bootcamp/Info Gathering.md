### Introduction

![[College/Bootcamp/img/image.png]]

The Primary goals of web recon include: 
- **Identifying Assets**: Uncovering all publicly accessible components of the target, such as web pages, subdomains, IP addresses, and technologies used. This step provides a comprehensive overview of the target's online presence.
- **Discovering Hidden Info**
- **Analyze the attack surface**
- **Gathering Intel**: Collecting information that can be leveraged for further exploitation or social engineering attacks. This includes identifying key personnel, email addresses, or patterns of behaviour that could be exploited.

#### Types of Reconnaissance 
- **Active recon**
- **Passive Recon**

###### Active Recon 
In active reconnaissance, the attacker `directly interacts with the target system` to gather information. This interaction can take various forms:

| Technique                | Description                                                                                   | Example                                                                                                                               | Tools                                                      | Risk of Detection                                                                                                  |
| ------------------------ | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `Port Scanning`          | Identifying open ports and services running on the target.                                    | Using Nmap to scan a web server for open ports like 80 (HTTP) and 443 (HTTPS).                                                        | Nmap, Masscan, Unicornscan                                 | High: Direct interaction with the target can trigger intrusion detection systems (IDS) and firewalls.              |
| `Vulnerability Scanning` | Probing the target for known vulnerabilities, such as outdated software or misconfigurations. | Running Nessus against a web application to check for SQL injection flaws or cross-site scripting (XSS) vulnerabilities.              | Nessus, OpenVAS, Nikto                                     | High: Vulnerability scanners send exploit payloads that security solutions can detect.                             |
| `Network Mapping`        | Mapping the target's network topology, including connected devices and their relationships.   | Using traceroute to determine the path packets take to reach the target server, revealing potential network hops and infrastructure.  | Traceroute, Nmap                                           | Medium to High: Excessive or unusual network traffic can raise suspicion.                                          |
| `Banner Grabbing`        | Retrieving information from banners displayed by services running on the target.              | Connecting to a web server on port 80 and examining the HTTP banner to identify the web server software and version.                  | Netcat, curl                                               | Low: Banner grabbing typically involves minimal interaction but can still be logged.                               |
| `OS Fingerprinting`      | Identifying the operating system running on the target.                                       | Using Nmap's OS detection capabilities (`-O`) to determine if the target is running Windows, Linux, or another OS.                    | Nmap, Xprobe2                                              | Low: OS fingerprinting is usually passive, but some advanced techniques can be detected.                           |
| `Service Enumeration`    | Determining the specific versions of services running on open ports.                          | Using Nmap's service version detection (`-sV`) to determine if a web server is running Apache 2.4.50 or Nginx 1.18.0.                 | Nmap                                                       | Low: Similar to banner grabbing, service enumeration can be logged but is less likely to trigger alerts.           |
| `Web Spidering`          | Crawling the target website to identify web pages, directories, and files.                    | Running a web crawler like Burp Suite Spider or OWASP ZAP Spider to map out the structure of a website and discover hidden resources. | Burp Suite Spider, OWASP ZAP Spider, Scrapy (customisable) | Low to Medium: Can be detected if the crawler's behaviour is not carefully configured to mimic legitimate traffic. |

###### Passive Reconnaissance 
In contrast, passive reconnaissance involves gathering information about the target `without directly interacting` with it. This relies on analysing publicly available information and resources, such as:

| Technique               | Description                                                                                                                     | Example                                                                                                                                           | Tools                                                                   | Risk of Detection                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `Search Engine Queries` | Utilising search engines to uncover information about the target, including websites, social media profiles, and news articles. | Searching Google for "`[Target Name] employees`" to find employee information or social media profiles.                                           | Google, DuckDuckGo, Bing, and specialised search engines (e.g., Shodan) | Very Low: Search engine queries are normal internet activity and unlikely to trigger alerts.           |
| `WHOIS Lookups`         | Querying WHOIS databases to retrieve domain registration details.                                                               | Performing a WHOIS lookup on a target domain to find the registrant's name, contact information, and name servers.                                | whois command-line tool, online WHOIS lookup services                   | Very Low: WHOIS queries are legitimate and do not raise suspicion.                                     |
| `DNS`                   | Analysing DNS records to identify subdomains, mail servers, and other infrastructure.                                           | Using `dig` to enumerate subdomains of a target domain.                                                                                           | dig, nslookup, host, dnsenum, fierce, dnsrecon                          | Very Low: DNS queries are essential for internet browsing and are not typically flagged as suspicious. |
| `Web Archive Analysis`  | Examining historical snapshots of the target's website to identify changes, vulnerabilities, or hidden information.             | Using the Wayback Machine to view past versions of a target website to see how it has changed over time.                                          | Wayback Machine                                                         | Very Low: Accessing archived versions of websites is a normal activity.                                |
| `Social Media Analysis` | Gathering information from social media platforms like LinkedIn, Twitter, or Facebook.                                          | Searching LinkedIn for employees of a target organisation to learn about their roles, responsibilities, and potential social engineering targets. | LinkedIn, Twitter, Facebook, specialised OSINT tools                    | Very Low: Accessing public social media profiles is not considered intrusive.                          |
| `Code Repositories`     | Analysing publicly accessible code repositories like GitHub for exposed credentials or vulnerabilities.                         | Searching GitHub for code snippets or repositories related to the target that might contain sensitive information or code vulnerabilities.        | GitHub, GitLab                                                          | Very Low: Code repositories are meant for public access, and searching them is not suspicious.         |

----
### WHOIS 
WHOIS is a widely used query and response protocol designed to access databases that store information about registered internet resources. Primarily associated with domain names, WHOIS can also provide details about IP address blocks and autonomous systems. Think of it as a giant phonebook for the internet, letting you look up who owns or is responsible for various online assets.

```shell
┌──(kali㉿kali)-[~]
└─$ whois rvce.edu.in 
Domain Name: rvce.edu.in
Registry Domain ID: D3610142-IN
Registrar URL: http://www.ernet.in
Updated Date: 2025-05-02T13:51:06.120Z
Creation Date: 2009-05-12T05:57:23.000Z
Registry Expiry Date: 2028-05-12T05:57:23.000Z
Registrar: ERNET India
Registrar IANA ID: 800068
Registrar Abuse Contact Email: tejalt@eis.ernet.in
Registrar Abuse Contact Phone: +91.1123358248
Domain Status: ok https://icann.org/epp#ok
Registry Registrant ID: REDACTED FOR PRIVACY
Registrant Name: REDACTED FOR PRIVACY
Registrant Organization: RV College of Engineering
Registrant Street: REDACTED FOR PRIVACY
Registrant City: REDACTED FOR PRIVACY
Registrant State/Province: Karnataka
Registrant Postal Code: REDACTED FOR PRIVACY
Registrant Country: IN

< SNIP... > 
```
Each WHOIS record typically contains the following information:

- `Domain Name`: The domain name itself (e.g., example.com)
- `Registrar`: The company where the domain was registered (e.g., GoDaddy, Namecheap)
- `Registrant Contact`: The person or organization that registered the domain.
- `Administrative Contact`: The person responsible for managing the domain.
- `Technical Contact`: The person handling technical issues related to the domain.
- `Creation and Expiration Dates`: When the domain was registered and when it's set to expire.
- `Name Servers`: Servers that translate the domain name into an IP address.

##### Why WHOIS Matters for a web recon 
Whois serves as a trove on information for pentesters during the recon phase of an assessment. It offers valuable insights into the target org's digital foorprints and potential vulnerabilities. 
- `Identifying Key Personnel`: WHOIS records often reveal the names, email addresses, and phone numbers of individuals responsible for managing the domain. This information can be leveraged for social engineering attacks or to identify potential targets for phishing campaigns.
- `Discovering Network Infrastructure`: Technical details like name servers and IP addresses provide clues about the target's network infrastructure. This can help penetration testers identify potential entry points or misconfigurations.
- `Historical Data Analysis`: Accessing historical WHOIS records through services like [WhoisFreaks](https://whoisfreaks.com/) can reveal changes in ownership, contact information, or technical details over time. This can be useful for tracking the evolution of the target's digital presence.

#### Utilizing WHOIS 
**Scenario 1: Phishing Investigation**
An email security gateway flags a suspicious email sent to multiple employees within a company. The email claims to be from the company's bank and urges recipients to click on a link to update their account information. A security analyst investigates the email and begins by performing a WHOIS lookup on the domain linked in the email.

The WHOIS record reveals the following:

- `Registration Date`: The domain was registered just a few days ago.
- `Registrant`: The registrant's information is hidden behind a privacy service.
- `Name Servers`: The name servers are associated with a known bulletproof hosting provider often used for malicious activities.

This combination of factors raises significant red flags for the analyst. The recent registration date, hidden registrant information, and suspicious hosting strongly suggest a phishing campaign. The analyst promptly alerts the company's IT department to block the domain and warns employees about the scam.

**Scenario 2: Malware Analysis** 
A security researcher is analysing a new strain of malware that has infected several systems within a network. The malware communicates with a remote server to receive commands and exfiltrate stolen data. To gain insights into the threat actor's infrastructure, the researcher performs a WHOIS lookup on the domain associated with the command-and-control (C2) server.

The WHOIS record reveals:
- `Registrant`: The domain is registered to an individual using a free email service known for anonymity.
- `Location`: The registrant's address is in a country with a high prevalence of cybercrime.
- `Registrar`: The domain was registered through a registrar with a history of lax abuse policies.

Based on this information, the researcher concludes that the C2 server is likely hosted on a compromised or "bulletproof" server. The researcher then uses the WHOIS data to identify the hosting provider and notify them of the malicious activity.

**Scenario 3: Threat Intelligence Report**
A cybersecurity firm tracks the activities of a sophisticated threat actor group known for targeting financial institutions. Analysts gather WHOIS data on multiple domains associated with the group's past campaigns to compile a comprehensive threat intelligence report.

By analysing the WHOIS records, analysts uncover the following patterns:
- `Registration Dates`: The domains were registered in clusters, often shortly before major attacks.
- `Registrants`: The registrants use various aliases and fake identities.
- `Name Servers`: The domains often share the same name servers, suggesting a common infrastructure.
- `Takedown History`: Many domains have been taken down after attacks, indicating previous law enforcement or security interventions.

These insights allow analysts to create a detailed profile of the threat actor's tactics, techniques, and procedures (TTPs). The report includes indicators of compromise (IOCs) based on the WHOIS data, which other organisations can use to detect and block future attacks.

