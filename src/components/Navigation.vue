<template>
  <div>
    <v-system-bar
      class="d-flex mb-6 header"
      short
      dense
      color="rgb(74, 92, 102)"
      app
    >
      <transition appear @enter="enterHeader">
        <h2 class="mx-16" id="background" @click="home()">Draw IT!</h2>
      </transition>
      <v-btn class="pa-2 ml-auto" @click="moveDrawer()" icon>
        <transition appear @enter="enterMenu">
          <v-icon class="white--text text-body-2 text-md-h5" title="Menu"
            >mdi-menu</v-icon
          >
        </transition>
        <transition appear @enter="enterMenu">
          <div class="white--text text-body-2 text-md-body-1">Menu</div>
        </transition>
      </v-btn>
    </v-system-bar>
    <v-navigation-drawer
      v-model="drawer"
      :temporary="false"
      disable-resize-watcher
      :mini-variant="!menuCompact.hidden"
      mini-variant-width="100"
      app
    >
      <div class="py-8" id="sidebar">
        <div class="sidebar-body">
          <div class="sidebar-links">
            <small class="my-8">Menu</small>
            <hr class="divider" />
            <div class="links">
              <a
                v-for="link in menuLinks"
                :key="link.title"
                @click="setLink(link.path)"
              >
                <v-icon :title="link.title" class="icon">
                  mdi-{{ link.icon }}
                </v-icon>
                <v-slide-x-transition mode="in-out" leave-absolute>
                  <div class="link-title" v-show="menuCompact.hidden">
                    {{ link.title }}
                  </div>
                </v-slide-x-transition>
              </a>
            </div>
          </div>
        </div>
      </div>
    </v-navigation-drawer>
  </div>
</template>
  
<script>
import gsap from "gsap";
export default {
  name: "SideBar",
  data: () => {
    return {
      drawer: false, // variable to control the drawer open/close state
      menuCompact: {
        hidden: true,
      },
      menuLinks: [
        { title: "Level-Auswahl", icon: "home", path: "lvl"},
        { title: "Tutorial",  icon: "information-variant", path: "tutorial"},
        { title: "Hilfen", icon: "email", path: "help"},
        { title: "Back to Homepage", icon: "logout-variant", path: "home"},
      ],
    };
  },
  methods: {
    // Navigate back to OnePagerHome
    home() {
      this.$router.push({ path: "/" });
    },
    moveDrawer() {
      let sidebar = document.querySelector("#sidebar"); // select the sidebar element
      this.drawer = !this.drawer; // toggle the state of the drawer
      if (this.drawer) sidebar.classList.add("drawer-open"); // if drawer is open, add class
      else sidebar.classList.remove("drawer-open"); // if drawer is closed, remove class
    },
    // Use GSAP library to animate the given element
    enterMenu(element) {
      gsap.fromTo(
        element,
        { y: 0, x: +200 },
        { delay: 2, duration: 2, y: 0, x: -50, opacity: 1, ease: "back.out(3)" }
      );
    },
    enterHeader(element) {
      gsap.fromTo(
        element,
        { x: -300 },
        { delay: 1, duration: 2, x: 50, opacity: 1, ease: "back.out(2)" }
      );
    },
    // Set the Routing-Path based on the given Path
    setLink(path) {
      this.$router.push({ path: "/", query: { section: path } });
    },
  },
};
</script>

<style scoped>
/* CSS only for Navigation */
.header {
  height: 4em !important;
  box-shadow: 0em 0.3em 0.3em rgba(255, 255, 255, 0.4);
  z-index: 7;
}
#sidebar {
  margin: 0;
  top: 0;
  left: 0;
  background-color: rgb(74, 92, 102);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.6);
  user-select: none;
}
.sidebar-links {
  padding-inline: 15px;
}
.sidebar-links small {
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 12px;
}
.divider {
  opacity: 0.25;
  border-radius: 100%;
  margin-bottom: 25px;
}
.sidebar-links .links {
  display: flex;
  flex-direction: column;
}
.sidebar-links a {
  text-decoration: none;
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 25px;
  padding-inline: 20px;
  padding-block: 15px;
  margin-block: 3px;
  font-weight: 900;
  border: 1px solid rgba(255, 255, 255, 0.85);
  transition: 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.sidebar-links a:hover {
  transform: scale(1.08);
  background-image: linear-gradient(
    to right,
    rgba(128, 186, 36, 1),
    rgb(76, 119, 7)
  );
  box-shadow: 0px 0px 8px rgba(128, 186, 36, 0.85);
  border-color: rgb(198, 246, 121);
}
.sidebar-links a:nth-last-of-type(1):hover {
  background-image: linear-gradient(to right, red, rgb(100, 0, 0));
  box-shadow: 0px 0px 8px red;
  border-color: red;
}
.sidebar-links .links a {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: rgba(0, 0, 0, 1);
}
.sidebar-links .link-title {
  margin-left: 10px;
}
.sidebar-links .icon {
  color: rgba(0, 0, 0, 0.9);
  margin-top: -1px;
  margin-left: 3px;
}

#background {
  font-family: Arial, Helvetica, sans-serif;
  margin-top: 1.5em;
  margin-left: 5em;
  transform: translate(-50%, -50%);
  color: rgba(255, 255, 255, 0.1);
  background: linear-gradient(
    to right,
    rgb(142, 226, 159),
    rgb(147, 202, 225),
    rgb(156, 156, 202),
    rgb(155, 200, 159),
    rgb(153, 196, 160),
    rgb(145, 144, 191),
    rgb(154, 188, 203),
    rgb(166, 209, 175)
  );
  background-size: 400%;
  -webkit-background-clip: text;
  background-clip: text;
  font-weight: 700;
  font-size: 3em;
  animation: bgTransition 10s linear infinite;
}

@keyframes bgTransition {
  0% {
    background-position: 0%;
  }

  100% {
    background-position: 400%;
  }
}
</style>