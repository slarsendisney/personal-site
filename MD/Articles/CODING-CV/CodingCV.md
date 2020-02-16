---
type: "Article"
path: "/articles/coding-my-cv"
title: "I Coded My CV in ReactJS 🚀"
desc: "Why not demonstrate my ability with the way I build it too? "
year: 2020
date: 2020-02-16

---

A CV is meant to be a document that summarises an individual’s unique skills, character, experience and achievements. Why not demonstrate my ability with the way I build it too? 

This is the question I have been pondering for a while now. Over the past few years my CV has gone through many changes. With each iteration it has been built with a different tool from Microsoft Word, to Sketch. Each tool has had its benefits but I have found it a time consuming process to get my CV looking perfect whenever I add a new role. I like it pixel perfect!

## Grid Systems

With CSS Flexbox, it has never been easier to make dynamic layouts and align content within containers. I built a simple row and column system that allowed me to arrange elements in the following structure:

![image](https://ik.imagekit.io/sld/CVLayout_BzC__nXGC.png) 



This is the same system I use on the rest of my website. Its made building the site layout a breeze.

## Making a ``` <div/> ``` look like paper

It was super important to me that the CV still looked like paper. I found [an article](https://css-tricks.com/snippets/css/stack-of-paper/) that demonstrated a way to make a div looked like stacked sheets of paper. This was perfect for my use case. 

## Two Birds, One Stone

I store my work experience, skills and education in JSON files:

``` json
[
  {
    "role": "UX Engineer",
    "company": "American Express",
    "location": "London",
    "date": "Sep 2019 - Present",
    "desc": "Currently creating the future of the ‘refer a friend’ experience.",
    "longDesc": "In my current role, I work both as a UX designer and Front-end developer in equal measure...",
    "tags": "User Experience, Rapid Prototyping, JS, ReactJS, Redux, GatsbyJS, GraphQL, Adobe Suite, Sketch",
    "url": "https://www.americanexpress.com"
  }
]
```

These JSON files are not just used to create my CV, but also to keep my correct role on my home page, and generate the timeline in my 'About Me' section. If I update these JSON files, It will update both my CV and my website in one go. Win! 🎉

<div class="row pad-10 is-white-bg"> 
  <div class="col-xs-12 col-md-6">
    <h4>CV </h4>
    <img src="https://ik.imagekit.io/sld/CV-Section_Ohbi3azgk.png" width="100%" />
  </div>
  <div class="col-xs-12 col-md-6">
    <h4>ABOUT ME </h4>
    <img src="https://ik.imagekit.io/sld/timeline-excerpt_yzG0Mc1ii.png" width="100%"/>
  </div>
</div>

## Exporting to PDF

This was by far the trickiest part of this project. Exporting react components to PDF is possible in a few lines of code (with the help of an [npm package](https://www.npmjs.com/package/react-to-pdf) or two!) but ensuring that pdf is A4 and your components fit within that page is no simple feat. I tried two different approaches to this problem.

### Using A Canvas
This was my quite hacky first attempt. I turned the components into a canvas, turned that canvas into a jpeg, then added the resulting image to the pdf. 
``` jsx
const printDocument = () => {
    const input = document.getElementById("cvDiv")
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL("image/jpeg", 1)
      const pdf = new jsPDF("portrait", "mm", "a4")
      pdf.scaleFactor = 3
      pdf.addImage(imgData, 0, 0, 210, 297)
      //pdf.output("dataurlnewwindow")
      pdf.save("CV-SamuelLarsen-Disney.pdf")
    })
  }
```
While this approach worked well, it meant the resultant pdf's text was not selectable. The resolution was also not perfect, and the file size(1.1mb) was larger than I was hoping for as it contained an image.

### Kendo-React-PDF
During my research, I came across [kendo-react-pdf](https://www.npmjs.com/package/@progress/kendo-react-pdf). This little library was an amazing find. It contains a component called "PDFExport" that I could wrap my CV in. This component has all the settings I needed to ensure my CV looked perfect when printing. I could specify paper size, margin and file name. The only thing that was left to do was ensure the div contained within this component was exactly A4 dimensions. 


``` jsx
<PDFExport
  scale={0.75}
  paperSize="A4"
  margin="0cm"
  ref={component => (this.pdfExportComponent = component)}
  fileName="CV-SamuelLarsen-Disney"
>

```

The resultant PDF was only 6kb. Thats 183 times smaller than my first approach!🎉


## The Result

If you're interested, you can check out my CV [here](/cv).

![image](https://ik.imagekit.io/sld/1_y4jyMf4OW_2uQB-JFHkk-g_l__uLgPaq.png)

## Potential Extensions

### Personalised CV
It would be possible to send personalised CVs by using a URL query parameter. Based on a chosen parameter, I could modify my opening statement to match the company I was applying for, highlight sections to different audiences and soo much more!

### A/B Testing
I could show variants of my CV to different users and use the "print me" button to determine the success of a variant. 