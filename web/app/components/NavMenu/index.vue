<template>
  <NavigationMenu class="">
    <NavigationMenuList>
      <NavigationMenuItem>
         <NuxtLink v-slot="{ isActive, href, navigate }" to="/" custom>
          <NavigationMenuLink
            :active="isActive"
            :href
            :class="navigationMenuTriggerStyle()"
            @click="navigate"
          >
            首页
          </NavigationMenuLink>
        </NuxtLink>
        <!-- <NavigationMenuTrigger>Item One</NavigationMenuTrigger> -->
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NuxtLink v-slot="{ isActive, href, navigate }" to="/dictionary" custom>
          <NavigationMenuLink
            :active="isActive"
            :href
            :class="navigationMenuTriggerStyle()"
            @click="navigate"
          >
            词典
          </NavigationMenuLink>
        </NuxtLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>

<script setup lang="ts">
import {
  NavigationMenu,
  //   NavigationMenuContent,
  // NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
//   NavigationMenuTrigger,
  // NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
</script>

<style scoped></style>
