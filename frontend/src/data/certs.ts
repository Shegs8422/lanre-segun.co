import microsoft from "../assets/certs/Microsoft.svg";
import googleCloud from "../assets/certs/Google-Cloud.svg";
import nvidia from "../assets/certs/Nvidia.svg";
import ibm from "../assets/certs/IBM.svg";
import google from "../assets/certs/Google.svg";
import alx from "../assets/certs/ALX.svg";
import coursera from "../assets/certs/Coursera.svg";
import amd from "../assets/certs/AMD.svg";
import mckinsey from "../assets/certs/mckinsey.png";

export type Cert = { name: string; src?: string };

export const CERTS: Cert[] = [
  { name: "Microsoft", src: microsoft },
  { name: "Google Cloud", src: googleCloud },
  { name: "Nvidia", src: nvidia },
  { name: "IBM", src: ibm },
  { name: "Google", src: google },
  { name: "ALX", src: alx },
  { name: "Mckinsey", src: mckinsey },
  { name: "Coursera", src: coursera },
  { name: "AMD", src: amd },
];
