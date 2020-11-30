# Overview

This is basically a website made for an new electrical contracting company. It's been a pretty interesting learning experience in terms of trying to efficiently design and develop something with business in mind. Trying to make something that appears visually compelling, but keeping the design work on the pragmatic side of things. At the I'm mostly striving for MVP at this point, but the idea is to get it deployed and functional for the client, and eventually scaling up the features and practicing SEO a bit.

## Learning Objectives

I'll be adding to this as challenges arrive or I begin to unearth aspects of the process which I realize to be valuable.

### Responsive Design

Certainly it was evident long before the project began that this was going to be a crux, but we'll extrapolate a few key points that I started with, or have taken note of.

- Mobile-first development
  - This is always something that I've understood as important, but often my tasks have been smaller in scope. This is finally a good chance to do so, and it has been enormously helpful at cutting down the amount of work needed to accomplish layout.
    - Although, is has also renewed my appreciation for the concept of prototyping, or at the *very least* wireframing your site design. It's interesting that mobile first approach almost cements the importance of having your scaled up design planned as well.
    - At least I personally this to be true, because while something might appear quite simple on mobile, the larger viewport designs may necessitate the addition of containers or elements present in mobile, that aren't necessarily apparent without full context!
  - I've been trying my best to avoid the need for many media queries. We're at a point in CSS technology where this is quite possible for a lot of layouts.
    - I've been trying to adopt and make use of techniques that make everything as responsive as possible without requiring explicit viewport-dependant declarations, beyond a few exceptions.
    - Implementing CSS custom properties for fluid typography and rem units, which I can also use for a lot of layout sizing, to keep adjustments uniform as device width changes

### Design Systems

This was something that became sort of a workflow blockage at times. I had so many revisions to how I was declaring classes as the need arose for it. The result was *dripping* **WET** code (stay tuned for my erotic fiction). To salvage the situation I ended up modularizing a lot of what I was working on in the interest of *shipping it*. I would not recommend this and will try to avoid it as much as I can in the future, and to do that. I think the best approach at the start of each project is to begin with ndesign systems in mind.

I've done some research on design systems and it seems like the proper (easiest for **me** to rationalize) approach to making this work, is to:
- Prototype the design, 
- Then identify the key elements that can be spread between reusable declarations,
- if possible identify any derivative versions of these base... we'll refer to them as *utilities*, though I'm trying to avoid comparing the level of investment being analogous to something like **Tailwind**. This is supposed to be sort of case by case to begin, and practice in workflow improvement and time allocation. Rather than immediately creating a robust system/library or relying on a built one.
- Then I can begin coding ground work using elements and nomenclature that fit the needs identified as best I can, with minimal modification where needed
  - if modification begins to scale upward, or I find a lot of adjacent common styling that was otherwise unthought of, that's then the **development informs the design**
    - **DESIGN INFORMS DEVELOPMENT, DEVELOPMENT INFORMS DESIGN** : this should be the sort of ebb and flow of the design/dev process. Having clear guides to begins with will keep a standardized coding process, and the process of coding, will then allow me to identify needs/weaknesses/revisions in the system if they don't work.


## All I got for now, add more later.