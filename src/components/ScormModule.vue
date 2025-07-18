<template>
  <div class="scorm-module">
    <h2>SCORM Demo</h2>
    <p>Student Name: {{ studentName }}</p>
    <button @click="initializeScorm">Initialize</button>
    <button @click="setStudentName">Set Student Name</button>
    <button @click="commitData">Commit</button>
    <button @click="finishScorm">Finish</button>
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
  name: "ScormModule",
  data() {
    return {
      api: null,
      studentName: "NamanSharma", // Default value, can be changed
      studentId: "749217", // Default value, can be changed
      scormUrl: "",
      scormReady: false,
    };
  },
  mounted() {
    // this.initializeScorm();
    // this.setStudentName();
  },
  methods: {
    initializeScorm() {
      // Pass initial SCORM data with student_id and student_name
      this.api = new Scorm12API({
        logLevel: 1,
        autocommit: true,
        autocommitSeconds: 30,
        lms: {
          "cmi.core.lesson_status": "not attempted",
          "cmi.core.student_id": this.studentId,
          "cmi.core.student_name": this.studentName,
          "cmi.core.lesson_location": "",
          "cmi.core.credit": "credit",
          "cmi.core.lesson_mode": "normal",
          "cmi.core.exit": "",
          "cmi.core.session_time": "00:00:00",
          "cmi.core.score.raw": "",
          "cmi.core.score.max": "",
          "cmi.core.score.min": "",
          "cmi.suspend_data": "",
          "cmi.launch_data": "",
          "cmi.comments": "",
          "cmi.comments_from_lms": "",
        },
      });
      window.API = this.api;
      this.scormUrl = "/scorm-content/index.html"; // Set your SCORM content URL here
      this.scormReady = true;
      console.log("SCORM Initialized", window.API);
    },
    setStudentName() {
      // Optionally, allow changing name/id and re-initializing
      this.scormReady = false;
      this.initializeScorm();
    },
    commitData() {
      if (this.api) {
        this.api.LMSCommit("");
        console.log("Data committed");
      }
    },
    finishScorm() {
      if (this.api) {
        this.api.LMSFinish("");
        console.log("SCORM session finished");
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
