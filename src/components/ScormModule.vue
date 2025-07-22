<template>
  <div class="scorm-module">
    <h2>SCORM Demo</h2>
    <p>Student Name: {{ studentName }}</p>
    <button @click="launchScorm">Launch SCORM</button>
    <button @click="commitData">Commit</button>
    <button @click="finishScorm">Finish</button>

    <div v-if="scormReady">
      <iframe
        ref="scormFrame"
        :src="scormUrl"
        width="100%"
        height="600px"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script>
import { Scorm12API } from "scorm-again";

export default {
  name: "ScormModule",
  data() {
    return {
      scormUrl: "",
      scormReady: false,
      studentId: "749217",
      studentName: "Naman Sharma",
      api: null,
    };
  },
  mounted() {
    // Initialize SCORM API when component mounts
    //this.launchScorm();
  },
  methods: {
    launchScorm() {
      // ✅ Step 1: Initialize SCORM API
      const scormAPI = new Scorm12API({
        autocommit: true,
        logLevel: 1,
        lms: {
          student_id: "749217",
          student_name: "Naman Sharma",
        },
      });

      // ✅ Step 2: Make API discoverable

      // scormAPI.LMSInitialize("");
      // scormAPI.LMSSetValue("cmi.core.student_id", "749217");
      // scormAPI.LMSSetValue("cmi.core.student_name", "Naman Sharma");
      // scormAPI.LMSSetValue("cmi.core.lesson_status", "completed");
      // scormAPI.LMSSetValue("cmi.core.score.raw", "95");
      // scormAPI.LMSSetValue("cmi.core.lesson_location", "page5");
      // scormAPI.LMSSetValue(
      //   "cmi.suspend_data",
      //   JSON.stringify({ progress: 80 })
      // );
      window.API = scormAPI;
      this.api = scormAPI;
      // ✅ Step 3: Load SCORM content
      this.scormUrl = "/scorm-content/index.html";
      this.scormReady = true;

      // ✅ Step 4: Inject API into iframe when it loads
      this.$nextTick(() => {
        const iframe = this.$refs.scormFrame;
        iframe.onload = () => {
          try {
            console.log("Injecting SCORM API into iframe");
            iframe.contentWindow.postMessage({
              student_id: "749217",
              student_name: "Naman Sharma",
            });
            console.log("✅ SCORM API injected into iframe");

            // No need to manually set student_id again—it’s already in `lms` config
          } catch (err) {
            console.error("❌ Failed to inject API:", err);
          }
        };
      });
    },
    commitData() {
      if (this.api) {
        this.api.LMSCommit("");
        console.log("✅ LMS data committed");
      }
    },
    finishScorm() {
      if (this.api) {
        this.api.LMSFinish("");
        console.log("✅ SCORM session finished");
      }
    },
  },
};
</script>

<style scoped>
.scorm-module {
  padding: 20px;
  border: 1px solid #ccc;
}
</style>
