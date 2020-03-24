<template>
<div class="text-center">
    <h1 class="headline">{{header}}</h1>

    <p class="subtitle-1">{{message}}</p>

    <v-btn color="brown lighten-2" text :to="to">
        {{action}}
    </v-btn>

</div>
        <!-- <v-card class="text-center">
            <v-card-title class="headline justify-center" >{{header}}</v-card-title>

            <v-card-text>
            {{message}}
            </v-card-text>

            <v-card-actions class="justify-center" v-if="to && action">

            <v-btn color="red darken-1" text :to="to">
                {{action}}
            </v-btn>
            </v-card-actions>
        </v-card> -->
    
</template>

<script>
export default {
    props: ["header", "message", "to", "action"]
};
</script>