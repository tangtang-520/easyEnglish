<script setup lang="ts">
import {
  BarChart3,
  Book,
  BookMarked,
  Globe,
  Trophy,
  Users,
  Zap,
} from "lucide-vue-next";
import { useUserInfoStore } from "~/stores/modules/userInfo";
import { useRouter } from "vue-router";
import czImg from "~/assets/images/home/cz.png"
import gkImg from "~/assets/images/home/gk.png"
import ysImg from "~/assets/images/home/ys.png"
import fourImg from "~/assets/images/home/four.png"

const userInfoStore = useUserInfoStore();
const router = useRouter();
const isVisible = ref<{ [key: string]: boolean }>({});
const counts = ref({
  users: 0,
  words: 0,
  lessons: 0,
});

// 处理页面滚动动画
const handleScroll = () => {
  const elements = document.querySelectorAll("[data-animate]");
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const id = el.getAttribute("id") || "";
    if (rect.top < window.innerHeight * 0.8 && !isVisible.value[id]) {
      isVisible.value[id] = true;
      el.classList.add("animate-in");
    }
  });
};

// 数字动画效果
const animateNumbers = () => {
  const duration = 2000;
  const steps = 60;
  const interval = duration / steps;
  let currentStep = 0;

  const timer = setInterval(() => {
    currentStep++;
    const progress = currentStep / steps;

    counts.value.users = Math.floor(progress * 10000);
    counts.value.words = Math.floor(progress * 3000000);
    counts.value.lessons = Math.floor(progress * 500);

    if (currentStep >= steps) {
      clearInterval(timer);
    }
  }, interval);
};

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll);

  // 延迟启动数字动画
  setTimeout(() => {
    animateNumbers();
  }, 1000);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
});

// 热门资源数据
const popularResources = [
  {
    id: 1,
    title: "四级英语真题",
    type: "词汇表",
    level: "初级",
    rating: 4.8,
    image: fourImg,
  },
  {
    id: 2,
    title: "雅思词汇",
    type: "词汇表",
    level: "高级",
    students: 1890,
    rating: 4.7,
    image: ysImg,
  },
  {
    id: 3,
    title: "高考必备词汇",
    type: "词汇表",
    level: "初级",
    students: 1560,
    rating: 4.9,
    image: gkImg,
  },
  {
    id: 4,
    title: "初中英语词汇",
    type: "词汇表",
    level: "初级",
    students: 3200,
    rating: 4.6,
    image: czImg,
  },
];
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-background/95 to-primary/10">
    <section class="relative overflow-hidden pt-24 pb-36 md:pt-32 md:pb-44">
      <div class="absolute inset-0 z-0">
        <div
          class="absolute top-0 left-1/4 w-96 h-96 bg-primary/15 rounded-full filter blur-3xl opacity-50 animate-blob"
        ></div>
        <div
          class="absolute top-1/3 right-1/4 w-80 h-80 bg-secondary/15 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"
        ></div>
        <div
          class="absolute bottom-0 left-1/3 w-72 h-72 bg-tertiary/15 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"
        ></div>
      </div>

      <div class="container mx-auto px-4 relative z-10 text-center">
        <Badge class="mb-6 bg-primary/10 text-primary px-4 py-1 font-medium"
          >高效英语学习平台</Badge
        >
        <h1
          class="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary drop-shadow-lg"
        >
          轻松掌握英语，<br class="md:hidden" />开启全球对话
        </h1>
        <p
          class="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
        >
          通过个性化学习计划、智能词典和互动练习，让英语学习变得简单有趣。
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            class="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-lg shadow-primary/30 transition-transform transform hover:-translate-y-1"
            @click="router.push('/learning')"
          >
            开始学习
            <Zap class="ml-2 h-5 w-5" />
          </Button>

          <Button
            class="px-8 py-6 text-lg bg-white hover:bg-muted text-primary font-semibold rounded-xl shadow-md transition-transform transform hover:-translate-y-1 border border-border"
            @click="router.push('/dictionary')"
          >
            探索词典
            <BookMarked class="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>

    <section class="py-12 bg-white">
      <div class="container mx-auto px-4">
        <div
          class="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 text-center"
        >
          <div>
            <div
              class="text-3xl md:text-4xl font-extrabold text-primary mb-2 animate-fade-in"
            >
              {{ counts.users.toLocaleString() }}+
            </div>
            <div
              class="text-muted-foreground flex items-center justify-center gap-1"
            >
              <Users class="h-4 w-4" /> 活跃用户
            </div>
          </div>
          <div>
            <div
              class="text-3xl md:text-4xl font-extrabold text-primary mb-2 animate-fade-in"
            >
              {{ counts.words.toLocaleString() }}
            </div>
            <div
              class="text-muted-foreground flex items-center justify-center gap-1"
            >
              <Book class="h-4 w-4" /> 词典词汇
            </div>
          </div>
          <div class="col-span-2 md:col-span-1">
            <div
              class="text-3xl md:text-4xl font-extrabold text-primary mb-2 animate-fade-in"
            >
              {{ counts.lessons.toLocaleString() }}+
            </div>
            <div
              class="text-muted-foreground flex items-center justify-center gap-1"
            >
              <Trophy class="h-4 w-4" /> 精品课程
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      id="features"
      data-animate
      class="py-20 opacity-0 translate-y-10 transition-all duration-1000"
    >
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <Badge class="mb-4 bg-secondary/10 text-secondary border-0"
            >核心功能</Badge
          >
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            专为你的英语学习打造
          </h2>
          <p class="text-muted-foreground max-w-2xl mx-auto">
            平台集成多种创新功能，帮助你更高效地学习英语。
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <Card
            class="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 bg-white"
          >
            <div class="p-6">
              <div
                class="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all duration-300"
              >
                <BookMarked class="h-7 w-7 text-primary" />
              </div>
              <h3 class="text-xl font-bold mb-3">智能词典</h3>
              <p class="text-muted-foreground mb-4">
                详细单词解释、发音、例句和同义词，支持离线查询和收藏。
              </p>
              <Button
                variant="ghost"
                class="p-0 h-auto text-primary hover:text-primary/80 hover:bg-transparent"
                >了解更多 →</Button
              >
            </div>
            <div
              class="h-1 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
            ></div>
          </Card>

          <Card
            class="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 bg-white"
          >
            <div class="p-6">
              <div
                class="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-all duration-300"
              >
                <Globe class="h-7 w-7 text-primary" />
              </div>
              <h3 class="text-xl font-bold mb-3">对话练习</h3>
              <p class="text-muted-foreground mb-4">
                通过AI虚拟对话伙伴练习口语，获得即时反馈。
              </p>
              <Button
                variant="ghost"
                class="p-0 h-auto text-primary hover:text-primary/80 hover:bg-transparent"
                >了解更多 →</Button
              >
            </div>
            <div
              class="h-1 bg-gradient-to-r from-secondary to-tertiary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
            ></div>
          </Card>

          <Card
            class="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 bg-white"
          >
            <div class="p-6">
              <div
                class="w-14 h-14 rounded-xl bg-tertiary/10 flex items-center justify-center mb-6 group-hover:bg-tertiary/20 transition-all duration-300"
              >
                <BarChart3 class="h-7 w-7 text-tertiary" />
              </div>
              <h3 class="text-xl font-bold mb-3">学习分析</h3>
              <p class="text-muted-foreground mb-4">
                跟踪学习进度，获取个性化学习建议，优化学习计划。
              </p>
              <Button
                variant="ghost"
                class="p-0 h-auto text-tertiary hover:text-tertiary/80 hover:bg-transparent"
                >了解更多 →</Button
              >
            </div>
            <div
              class="h-1 bg-gradient-to-r from-tertiary to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
            ></div>
          </Card>
        </div>
      </div>
    </section>

    <section
      id="resources"
      data-animate
      class="py-20 bg-muted/30 opacity-0 translate-y-10 transition-all duration-1000"
    >
      <div class="container mx-auto px-4">
        <div
          class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10"
        >
          <div>
            <Badge class="mb-4 bg-tertiary/10 text-tertiary border-0"
              >学习资源</Badge
            >
            <h2 class="text-3xl font-bold">热门学习材料</h2>
          </div>
          <Button
            class="mt-4 md:mt-0 bg-white text-primary hover:bg-muted border border-border"
            >查看全部资源</Button
          >
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            v-for="resource in popularResources"
            :key="resource.id"
            class="overflow-hidden py-0 gap-0 border-0 shadow-md hover:shadow-xl transition-all duration-300 group bg-white rounded-xl"
          >
            <div class="relative h-48 overflow-hidden rounded-t-xl">
              <img
                :src="resource.image"
                :alt="resource.title"
                class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <Badge
                class="absolute top-3 left-3 bg-background/70 text-foreground backdrop-blur-sm"
                >{{ resource.type }}</Badge
              >
              <Badge
                class="absolute top-3 right-3 bg-background/70 text-foreground backdrop-blur-sm"
                >{{ resource.level }}</Badge
              >
            </div>
            <div class="p-5">
              <h3
                class="text-lg text-center font-semibold line-clamp-2 group-hover:text-primary transition-colors duration-300"
              >
                {{ resource.title }}
              </h3>
            </div>
          </Card>
        </div>
      </div>
    </section>

    <section
      id="cta"
      data-animate
      class="py-24 opacity-0 translate-y-10 transition-all duration-1000"
    >
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <div
            class="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-8 md:p-12 shadow-lg"
          >
            <h2 class="text-3xl md:text-4xl font-bold mb-6">
              准备好提升你的英语水平了吗？
            </h2>
            <p class="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              加入我们的学习社区，开始你的英语学习之旅。无论你是初学者还是高级学习者，我们都能帮助你达成目标。
            </p>
            <ClientOnly>
              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  class="px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-lg shadow-primary/30 transition-transform transform hover:-translate-y-1"
                  @click="
                    userInfoStore.hasToken
                      ? router.push('/learning')
                      : router.push('/login')
                  "
                >
                  {{ userInfoStore.hasToken ? "继续学习" : "立即注册" }}
                </Button>
                <Button
                  class="px-8 py-6 text-lg bg-white hover:bg-muted text-primary font-semibold rounded-xl shadow-md transition-transform transform hover:-translate-y-1 border border-border"
                  @click="
                    userInfoStore.hasToken
                      ? router.push('/dictionary')
                      : router.push('/login')
                  "
                >
                  {{ userInfoStore.hasToken ? "探索词典" : "已有账号？登录" }}
                </Button>
              </div>
            </ClientOnly>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* blob动画 */
@keyframes blob {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(10px, -10px) scale(1.05);
  }
  50% {
    transform: translate(0, 10px) scale(0.95);
  }
  75% {
    transform: translate(-10px, -5px) scale(1.03);
  }
}
.animate-blob {
  animation: blob 20s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}

/* 滚动动画 */
[data-animate].animate-in {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

/* 数字渐入动画 */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-fade-in {
  animation: fadeIn 1s ease forwards;
}
</style>
