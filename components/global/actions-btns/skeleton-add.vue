<template>
    <div class="content-actions-btns-detail-global">
        <v-spacer v-if="!bTablet" />
        <div v-if="bMobile" class="content-action-btn-general-global">
            <v-skeleton-loader min-width="100" type="button" />
        </div>
        <div class="content-action-btn-cancel-global">
            <v-skeleton-loader min-width="100" type="button" />
        </div>
        <div v-if="!bMobile" class="content-action-btn-general-global">
            <v-skeleton-loader min-width="100" type="button" />
        </div>
    </div>
</template>
<script>
export default {

    data() {
        return {
            bMobile: false,
            bTablet: false,
        }
    },
    beforeDestroy() {
        if (typeof window === 'undefined') return
        window.removeEventListener('resize', this.onResize, { passive: true })
    },
    mounted() {
        this.onResize()
        window.addEventListener('resize', this.onResize, { passive: true })
    },
    methods: {
        onResize() {
            this.bMobile = window.innerWidth < 599.99;
            this.bTablet = window.innerWidth > 600 && window.innerWidth < 959.99;

        },
    }
}
</script>
<style scoped>
.content-actions-btns-detail-global {
    display: flex;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;

}

.content-action-btn-delete-global {
    width: 150px;
}

.content-action-btn-cancel-global {
    width: 150px;
}

.content-action-btn-general-global {
    width: 150px;
    margin-left: 15px;
}

/*#region MODO RESPONSIVO MAQUETA */

/*#region XS */
@media (max-width: 599px) {
    .demoColorResponsive {
        background-color: rgb(190, 136, 226);
    }

    .content-actions-btns-detail-global {
        display: block;
        width: 100%;
        margin-top: 20px;
        margin-bottom: 20px;

    }

    .content-action-btn-delete-global {
        width: 100%;
    }

    .content-action-btn-cancel-global {
        width: 100%;
        margin-top: 20px;
    }

    .content-action-btn-general-global {
        width: 100%;
        margin-left: 0px;
        margin-top: 20px;
    }

}

/*#endregion XS */

/*#region SM */
@media (min-width: 600px) and (max-width: 959px) {
    .demoColorResponsive {
        background-color: rgb(136, 226, 151);
    }

    .content-actions-btns-detail-global {
        display: flex;
        width: 100%;
        margin-top: 20px;
        margin-bottom: 20px;
        justify-content: center;
    }
}

/*#endregion SM */

/*#region MD */
@media (min-width: 960px) and (max-width: 1264px) {
    .demoColorResponsive {
        background-color: rgb(201, 122, 83);
    }
}

/*#endregion MD */

/*#region LG */
@media (min-width: 1264px) and (max-width: 1904px) {
    .demoColorResponsive {
        background-color: rgb(204, 198, 109);
    }
}

/*#endregion LG */

/*#region XL */
@media (min-width: 1904px) {
    .demoColorResponsive {
        background-color: rgb(113, 199, 201);
    }
}

/*#endregion XL */

/*#endregion MODO RESPONSIVO  MAQUETA */
</style>