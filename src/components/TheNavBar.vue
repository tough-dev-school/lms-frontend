<template>
  <nav class="navigation">
    <section class="container">
      <a class="navigation-title" href="/">
        <h1 class="title">Site Title</h1>
      </a>
      <ul class="navigation-list float-right">
        <li class="navigation-item"><a class="navigation-link" href="/list">Sites</a></li>
        <li class="navigation-item"><a class="navigation-link" href="/login">Login</a></li>
      </ul>
    </section>
  </nav>
</template>

<style scoped>
.wrapper {
  display: block;
  overflow: hidden;
  position: relative;
  width: 100%;
}
.wrapper .container {
  /*max-width:80rem*/
}
.wrapper > .container {
  /*padding-bottom:7.5rem;*/
  padding-top: 2rem;
}
.header {
  background-color: #f4f5f6;
  padding-top: 1rem;
}
@media (min-width: 40rem) {
  .header {
    padding-top: 5rem;
  }
}
.header + section {
  border-top: 0;
}
.header .container {
  border-top: 0;
  padding-bottom: 7.5rem;
  padding-top: 7.5rem;
  position: relative;
  text-align: center;
}
.header .title {
  font-family: Gotham Rounded A, Gotham Rounded B, Helvetica Neue, Arial, sans-serif;
}
.header .img {
  height: 15rem;
  margin-bottom: 2rem;
}
.header .img path {
  animation: 7s a forwards;
  fill: #9b4dca;
  stroke: #9b4dca;
  stroke-dasharray: 38321;
  stroke-miterlimit: 10;
  stroke-width: 15px;
}
.header .button {
  margin-bottom: 4rem;
  margin-top: 2rem;
}
@media (min-width: 40rem) {
  .header .button {
    margin-bottom: 4rem;
    margin-top: 2rem;
  }
}
@keyframes a {
  0% {
    fill-opacity: 0;
    stroke-dashoffset: 38321;
  }
  25% {
    fill-opacity: 0;
    stroke: #9b4dca;
  }
  to {
    fill-opacity: 1;
    stroke-dashoffset: 0;
  }
}
.navigation {
  background: #f4f5f6;
  border-bottom: 0.1rem solid #d1d1d1;
  display: block;
  height: 5.2rem;
  left: 0;
  max-width: 100%;
  /* position:fixed;
    right:0;
    top:0;*/
  width: 100%;
  /*z-index:1*/
}
.navigation .container {
  padding-bottom: 0;
  padding-top: 0;
}
.navigation .navigation-list {
  list-style: none;
  margin-bottom: 0;
  /*margin-right:5rem*/
}
@media (min-width: 80rem) {
  .navigation .navigation-list {
    margin-right: 0;
  }
}
.navigation .navigation-item {
  float: left;
  margin-bottom: 0;
  margin-left: 2.5rem;
  position: relative;
}
.navigation .img {
  fill: #9b4dca;
  height: 2rem;
  position: relative;
  top: 0.3rem;
}
.navigation .navigation-title,
.navigation .title {
  color: #606c76;
  position: relative;
}
.navigation .navigation-link,
.navigation .navigation-title,
.navigation .title {
  display: inline;
  font-size: 1.6rem;
  line-height: 5.2rem;
  padding: 0;
  text-decoration: none;
}
.navigation .navigation-link.active {
  color: #606c76;
}
@keyframes b {
  0%,
  50% {
    transform: rotate(0);
  }
  25%,
  75% {
    transform: rotate(-25deg);
  }
}
.popover {
  background: #fff;
  border: 0.1rem solid #d1d1d1;
  border-radius: 0.4rem;
  display: none;
  filter: drop-shadow(0 0 0.6rem rgba(0, 0, 0, 0.1));
  left: 50%;
  min-width: 13.4rem;
  position: absolute;
  top: 94%;
  transform: translateX(-50%);
}
.popover.popover-open {
  display: block;
}
.popover:after,
.popover:before {
  border: solid transparent;
  border-color: transparent;
  border-width: 1rem;
  content: " ";
  height: 0;
  left: 50%;
  pointer-events: none;
  position: absolute;
  right: 1.7rem;
  top: 0;
  width: 0;
}
.popover:after {
  border-bottom-color: #fff;
  transform: translate(-50%, -100%);
}
.popover:before {
  border-bottom-color: #d1d1d1;
  transform: translate(-50%, -102%);
}
.popover .popover-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.popover .popover-item {
  margin: 0;
  padding: 0;
}
.popover .popover-item:first-child .popover-link {
  border-radius: 0.4rem 0.4rem 0 0;
}
.popover .popover-item:last-child .popover-link {
  border-bottom-width: 0;
  border-radius: 0 0 0.4rem 0.4rem;
}
.popover .popover-link {
  border-bottom: 0.1rem solid #d1d1d1;
  color: #606c76;
  display: block;
  font-size: 1.2rem;
  padding: 0.8rem 2rem;
  position: relative;
  text-align: center;
  text-decoration: none;
}
.popover .popover-link:hover {
  background: #9b4dca;
  border-bottom-color: #9b4dca;
  color: #fff;
}
@media (min-width: 40rem) {
  .only-mobile {
    display: none;
  }
}

.popover-item {
  z-index: 10;
}
</style>
