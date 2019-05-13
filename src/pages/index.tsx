import React from "react"

import Layout from "../components/layout.component"
import SEO from "../components/seo.component"

const IndexPage = () => (
  <Layout>
    <SEO title="Welcome" />
    <h1>Open-source mods for and by the Minecraft community</h1>
    <h2>We're a collection of mods, plugins, and tools created for Minecraft by members of the community. Our projects are all open source and power all varieties of servers — from the large to the family-sized. Many of our projects are available, officially or unofficially, for Bukkit, Sponge, Minecraft Forge, MinecraftEdu, LiteLoader, CanaryMod, and other platforms.</h2>
  </Layout>
)

export default IndexPage
