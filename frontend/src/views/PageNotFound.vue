<template>
<no-data
    header="Oops! Vous êtes perdu ? 😅"
    message="Cette page n'existe pas."
/>
</template>

<script>

import NoData from "../components/NoData";
  export default {
    data: () => ({}),
    components: {
        "no-data": NoData
    }
  }
</script>
