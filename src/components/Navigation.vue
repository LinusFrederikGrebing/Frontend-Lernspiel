<template>
  <div>
    <v-app-bar class="d-flex mb-6" short dense color="rgb(74, 92, 102)" app>
      <transition appear @before-enter="beforeEnter" @enter="enter">
        <h2 class="mx-16" id="background">Draw IT!</h2>
      </transition>
      <v-btn class="pa-2 ml-auto" @click="drawer = !drawer" icon>
        <transition appear @enter="enterMenu">
          <v-icon class="thmcolorgreen" title="Menu">mdi-menu</v-icon>
        </transition>
        <transition appear @enter="enterMenu">
          <div class="thmcolorgreen">Menu</div>
        </transition>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :temporary="false"
      disable-resize-watcher
      :mini-variant="!menuCompact.hidden"
      mini-variant-width="100"
      app
    >
      <div id="sidebar">
        <div class="sidebar-body">
          <div class="sidebar-links">
            <small class="my-8">Menu</small>
            <hr class="divider" />
            <small>{{ "Level " + currentLevelId }}</small>
            <hr class="divider" />
            <div class="links">
              <a
                v-for="link in menuLinks"
                :key="link.title"
                :href="link.path"
                target="_blank"
              >
                <v-icon :title="link.title" class="icon"
                  >mdi-{{ link.icon }}</v-icon
                >

                <v-slide-x-transition mode="in-out" leave-absolute>
                  <div
                    class="link-title"
                    v-show="menuCompact.hidden"
                    @click="setLink(link)"
                  >
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
  props: {
    currentLevelId: {
      Type: Number,
      default: 1,
    },
  },
  data: () => {
    return {
      drawer: true,
      menuCompact: {
        hidden: true,
      },
      menuLinks: [
        { title: "Level-Auswahl", icon: "home" },
        { path: "#", title: "Tutorial", icon: "information-variant" },
        { path: "#", title: "Hilfen", icon: "email" },
        { path: "#", title: "Back to Homepage", icon: "logout-variant" },
      ],
    };
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = "0";
      el.style.transform = "translateX(-100px)";
      el.style.transform = "translateY(-100px)";
    },
    enterMenu(el) {
      gsap.fromTo(
        el,
        { y: 0, x: 0},
        { delay:2, duration: 2, y: 0, x: 0, opacity: 1, ease: "back.out(3)" }
      );
    },
    enter(el) {
      gsap.fromTo(
        el,
        { y: -35, x: 0 },
        { delay: 1, duration: 2, y: -35, x: 0, opacity: 1, ease: "back.out(2)" }
      );
    },
    setLink(link) {
      if (link.title === "Level-Auswahl") {
        this.$emit("lvlSelection");
      }
    },
    // Momentan nicht in Benutzung, war evtl. als Übergang zur Levelübersicht gedacht
    levelAnimation(link) {
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          let element = document.getElementById("x" + i + "y" + j);
          gsap.to(element, {
            duration: 0.5,
            scale: 0.2,
            y: 60,
            yoyo: true,
            ease: "power1.inOut",
            delay: 0.5,
            stagger: {
              amount: 1.5,
              grid: "auto",
              from: "center",
            },
            repeatDelay: 1,
            onComplete: () => this.setLink(link),
          });
        }
      }
    },
  },

  watch: {
    currentLevel() {
      console.log(this.currentLevelId);
    },
  },
};
</script>

<style scoped>
.thmcolorgreen {
  color: rgba(128, 186, 36, 1);
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

.app-bar-content {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}

.app-bar-content h2 {
  color: rgba(255, 255, 255, 1);
}

.app-bar-content h2:hover {
  color: rgba(128, 186, 36, 1);
}

@media screen and (max-width: 600px) {
  .app-bar-content h2 {
    font-size: 18px;
  }
}

#background {
  position: absolute;
  font-family: Arial, Helvetica, sans-serif;
  top: 50%;
  left: 5%;
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
  animation: sTransition 10s linear infinite;
}

@keyframes sTransition {
  0% {
    background-position: 0%;
  }

  100% {
    background-position: 400%;
  }
}
</style>