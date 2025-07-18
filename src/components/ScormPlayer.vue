<template>
  <div>
    <iframe
      v-if="scormReady"
      ref="scormFrame"
      :src="scormUrl"
      width="100%"
      height="600px"
      frameborder="0"
      allow="fullscreen"
    ></iframe>
  </div>
</template>

<script>
import { Scorm12API } from "scorm-again";

export default {
  name: "ScormPlayer",
  data() {
    return {
      scormUrl: "/scorm-content/index.html",
      scormReady: false,
    };
  },
  mounted() {
    const api = new Scorm12API({
      autocommit: true,
      courseId: "my-course",
      masteryScore: 80,
    });

    // Attach to window for SCORM content to access
    window.API = api;
    console.log("window.API", window.API);
    //var result = window.API.LMSInitialize("");
    console.log("SCORM Initialized", result);
    if (window.API) {
      this.scormReady = true;
    }

    // Optional: listen to SCORM events
    api.on("SetValue.cmi.score.raw", (value) => {
      console.log("Score updated:", value);
    });
  },
};
</script>
