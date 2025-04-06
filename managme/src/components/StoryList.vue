<script setup lang="ts">
import type { Story } from "@/types/Story";
import UserService from "@/services/userService";
import StoryService from "@/services/storyService";

const props = defineProps<{
    stories: Story[];
}>();

const emit = defineEmits(["edit"]);

const getOwnerName = (id: string) => {
    const user = UserService.getLoggedUser();
    return user.id === id ? `${user.firstName} ${user.lastName}` : "Nieznany";
};

const deleteStory = (id: string) => {
    StoryService.delete(id);
    emit("edit", null);
};

const filterByState = (state: string) => {
    return props.stories.filter((s) => s.state === state);
};
</script>

<template>
    <div>
        <h4 class="mb-3">Historyjki</h4>
        <div class="row">
            <div class="col-md-4">
                <h5>🕒 Do zrobienia</h5>
                <ul class="list-group">
                    <li v-for="story in filterByState('todo')" :key="story.id"
                        class="list-group-item d-flex justify-content-between">
                        <div>
                            <strong>{{ story.name }}</strong><br />
                            <small>{{ story.description }}</small><br />
                            <small>Priorytet: {{ story.priority }} | Autor: {{ getOwnerName(story.ownerId) }}</small>
                        </div>
                        <div>
                            <button class="btn btn-sm btn-outline-primary me-1"
                                @click="$emit('edit', story)">Edytuj</button>
                            <button class="btn btn-sm btn-outline-danger" @click="deleteStory(story.id)">Usuń</button>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="col-md-4">
                <h5>⚙️ W trakcie</h5>
                <ul class="list-group">
                    <li v-for="story in filterByState('doing')" :key="story.id"
                        class="list-group-item d-flex justify-content-between">
                        <div>
                            <strong>{{ story.name }}</strong><br />
                            <small>{{ story.description }}</small><br />
                            <small>Priorytet: {{ story.priority }} | Autor: {{ getOwnerName(story.ownerId) }}</small>
                        </div>
                        <div>
                            <button class="btn btn-sm btn-outline-primary me-1"
                                @click="$emit('edit', story)">Edytuj</button>
                            <button class="btn btn-sm btn-outline-danger" @click="deleteStory(story.id)">Usuń</button>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="col-md-4">
                <h5>✅ Zrobione</h5>
                <ul class="list-group">
                    <li v-for="story in filterByState('done')" :key="story.id"
                        class="list-group-item d-flex justify-content-between">
                        <div>
                            <strong>{{ story.name }}</strong><br />
                            <small>{{ story.description }}</small><br />
                            <small>Priorytet: {{ story.priority }} | Autor: {{ getOwnerName(story.ownerId) }}</small>
                        </div>
                        <div>
                            <button class="btn btn-sm btn-outline-primary me-1"
                                @click="$emit('edit', story)">Edytuj</button>
                            <button class="btn btn-sm btn-outline-danger" @click="deleteStory(story.id)">Usuń</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
