<template>
    <Dropdown>
        <template #trigger>
            <button
                class="dropdown-button">
                Crawler
            </button>
        </template>
        <ul class="menu-list">
            <li
                v-for="item in menuItems"
                :key="item.id">
                <div
                    class="menu-item"
                    @click="openForm(item.id)">
                    {{ item.name }}
                </div>
            </li>
        </ul>
    </Dropdown>
    <div
            v-if="showModal"
            class="modal-background">
            <div class="modal-container">
                <component
                    :is="currentForm"
                    @close="closeForm" />
            </div>
        </div>
</template>
<script>
import CrawlDomainForm from '@/components/CrawlDomainForm.vue';
import CrawlUrlForm from '@/components/CrawlUrlForm.vue';
import Dropdown from 'v-dropdown'

export default {
    name: 'CrawlerForm',
    components: {
        CrawlUrlForm,
        CrawlDomainForm,
        Dropdown
    },
    data() {
        return {
            showDropdown: false,
            menuItems: [
                { id: 1, name: 'Crawl URL' },
                { id: 2, name: 'Crawl domain' }
            ],
            showModal: false,
            currentForm: ''
        };
    },
    methods: {
        openForm(itemId) {
            this.currentForm = this.getFormName(itemId);
            this.showModal = true;
        },
        closeForm() {
            this.showModal = false;
        },
        getFormName(itemId) {
            switch (itemId) {
                case 1:
                    return 'crawl-url-form';
                case 2:
                    return 'crawl-domain-form';
                default:
                    return '';
            }
        }
    }
};
</script>
<style scoped>

.dropdown-button {
    width: 70px;
    height: 25px;
    border: 1px solid #242622;
    border-radius: 15px;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.2);
    background-color: white;
}

.dropdown-button:hover,
.dropdown-button:active {
    background-color: #333333;
    color: white;
}

.menu-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
}

.menu-item {
    display: block;
    padding: 5px 0;
    color: #333;
    font-size: 12px;
    text-decoration: none;
    text-align: left;
    font-family:Arial, Helvetica, sans-serif;
}

.menu-item:hover {
    background-color: #f2f2f2;
    cursor: pointer;
}

.modal-background {
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-container {
    position: absolute;
    top: 25%;
    width: 300px;
    z-index: 99999;
    background-color: #f2f2f2;
    border-radius: 5px;
}
</style>
