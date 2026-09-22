/**
 * ============================================================================
 * MAAZ SAQIB — PORTFOLIO ENGINE (main.js)
 * Clean Interactions, Subtle 3D Tilt, Proof Lightbox & Lead Generation
 * ============================================================================
 */

// ==========================================
// 1. CONFIGURATION
// ==========================================
const CONFIG = {
  // Update this to your actual Google Drive folder link anytime:
  DRIVE_VAULT_URL: "https://drive.google.com/drive/folders/1_MaazSaqib_PortfolioProof_Vault",
  
  // Contact details:
  PHONE_NUMBER: "923317671336",
  EMAIL: "maazsaqib80@gmail.com",
  LINKEDIN: "https://www.linkedin.com/in/maaz-saqib-209352246",
  INSTAGRAM_FACTIFY: "https://www.instagram.com/thefactify.pk?stkn=NnlkOXptdGN3MTJu&utm_source=qr"
};

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initCounters();
  initProofFilter();
  initProofModal();
  initVaultModal();
  initCaseStudyModal();
  init3DTilt();
  initCaseStudyTabs();
  initContactForm();
});

// ==========================================
// 2. HEADER & MOBILE NAVIGATION
// ==========================================
function initHeader() {
  const header = document.getElementById("siteHeader");
  const toggle = document.getElementById("mobileToggle");
  const menu = document.getElementById("navMenu");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("open");
    });

    menu.querySelectorAll(".nav-link, .mobile-menu-actions a").forEach(link => {
      link.addEventListener("click", () => menu.classList.remove("open"));
    });
  }
}

// ==========================================
// 3. ANIMATED METRICS COUNTER
// ==========================================
function initCounters() {
  const counters = document.querySelectorAll(".ribbon-val[data-target]");
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute("data-target"));
        const suffix = el.textContent.replace(/[\d.]/g, "");
        let current = 0;
        const step = target / 35;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = (Number.isInteger(target) ? Math.floor(current) : current.toFixed(1)) + suffix;
        }, 30);

        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// ==========================================
// 4. SUBTLE 3D CARD TILT
// ==========================================
function init3DTilt() {
  const heroCard = document.getElementById("hero3DCard");
  if (heroCard) {
    applySubtleTilt(heroCard, 8);
  }

  const proofCards = document.querySelectorAll(".proof-inner");
  proofCards.forEach(card => {
    applySubtleTilt(card, 5);
  });

  function applySubtleTilt(element, maxAngle) {
    element.addEventListener("mousemove", (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxAngle;
      const rotateY = ((x - centerX) / centerX) * maxAngle;

      element.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(1)}deg) rotateY(${rotateY.toFixed(1)}deg) translateY(-4px)`;
    });

    element.addEventListener("mouseleave", () => {
      element.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    });
  }
}

// ==========================================
// 5. CAMPAIGN DATA FILTER TABS
// ==========================================
function initProofFilter() {
  const tabs = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".proof-card");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const filter = tab.getAttribute("data-filter");
      cards.forEach(card => {
        const categories = card.getAttribute("data-category") || "";
        if (filter === "all" || categories.includes(filter)) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
}

// ==========================================
// 6. DATA RECORD LIGHTBOX MODAL
// ==========================================
function initProofModal() {
  const modal = document.getElementById("proofModal");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const modalSubtitle = document.getElementById("modalSubtitle");
  const closeBtn = document.getElementById("modalCloseBtn");
  const backdrop = document.getElementById("modalBackdrop");
  const modalVaultBtn = document.getElementById("modalVaultBtn");
  if (!modal) return;

  const proofCards = document.querySelectorAll(".proof-card");
  proofCards.forEach(card => {
    card.addEventListener("click", () => {
      const imgSrc = card.getAttribute("data-modal");
      const title = card.getAttribute("data-title") || "Campaign Performance Record";
      const subtitle = card.getAttribute("data-subtitle") || "Verified Analytics & Channel Metrics";

      if (modalImg && imgSrc) modalImg.src = imgSrc;
      if (modalTitle) modalTitle.textContent = title;
      if (modalSubtitle) modalSubtitle.textContent = subtitle;

      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);

  if (modalVaultBtn) {
    modalVaultBtn.addEventListener("click", () => {
      closeModal();
      openVaultModal();
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });
}

// ==========================================
// 7. GOOGLE DRIVE ASSET VAULT MODAL
// ==========================================
function openVaultModal() {
  const vaultModal = document.getElementById("vaultModal");
  if (!vaultModal) return;
  vaultModal.classList.add("open");
  vaultModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeVaultModal() {
  const vaultModal = document.getElementById("vaultModal");
  if (!vaultModal) return;
  vaultModal.classList.remove("open");
  vaultModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function initVaultModal() {
  const vaultModal = document.getElementById("vaultModal");
  const closeBtn = document.getElementById("vaultCloseBtn");
  const backdrop = document.getElementById("vaultBackdrop");
  const dismissBtn = document.getElementById("vaultDismissBtn");
  const copyBtn = document.getElementById("driveCopyBtn");
  const bannerCopyBtn = document.getElementById("copyVaultBtn");
  const driveUrlInput = document.getElementById("driveUrlInput");
  const driveDirectLink = document.getElementById("driveDirectLink");

  // Sync configured URL
  if (driveUrlInput) driveUrlInput.value = CONFIG.DRIVE_VAULT_URL;
  if (driveDirectLink) driveDirectLink.href = CONFIG.DRIVE_VAULT_URL;

  // Trigger buttons
  const triggerIds = ["navVaultBtn", "heroVaultBtn", "bannerVaultBtn"];
  triggerIds.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openVaultModal();
      });
    }
  });

  if (closeBtn) closeBtn.addEventListener("click", closeVaultModal);
  if (backdrop) backdrop.addEventListener("click", closeVaultModal);
  if (dismissBtn) dismissBtn.addEventListener("click", closeVaultModal);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && vaultModal && vaultModal.classList.contains("open")) {
      closeVaultModal();
    }
  });

  function copyLink(btnElement) {
    navigator.clipboard.writeText(CONFIG.DRIVE_VAULT_URL).then(() => {
      const originalHTML = btnElement.innerHTML;
      btnElement.innerHTML = `<i class="fa-solid fa-check"></i> <span>Copied!</span>`;
      setTimeout(() => {
        btnElement.innerHTML = originalHTML;
      }, 2000);
    }).catch(err => {
      console.error("Failed to copy URL:", err);
    });
  }

  if (copyBtn) copyBtn.addEventListener("click", () => copyLink(copyBtn));
  if (bannerCopyBtn) bannerCopyBtn.addEventListener("click", () => copyLink(bannerCopyBtn));
}

// ==========================================
// 8. CASE STUDY STRATEGIC BREAKDOWN MODAL
// ==========================================
function openCaseStudyModal() {
  const modal = document.getElementById("caseStudyModal");
  if (!modal) return;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeCaseStudyModal() {
  const modal = document.getElementById("caseStudyModal");
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function initCaseStudyModal() {
  const openBtn = document.getElementById("openCaseStudyModalBtn");
  const closeBtn = document.getElementById("caseStudyCloseBtn");
  const backdrop = document.getElementById("caseStudyBackdrop");
  const dismissBtn = document.getElementById("csDismissBtn");
  const contactBtn = document.getElementById("csContactBtn");

  if (openBtn) {
    openBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openCaseStudyModal();
    });
  }

  if (closeBtn) closeBtn.addEventListener("click", closeCaseStudyModal);
  if (backdrop) backdrop.addEventListener("click", closeCaseStudyModal);
  if (dismissBtn) dismissBtn.addEventListener("click", closeCaseStudyModal);
  if (contactBtn) contactBtn.addEventListener("click", closeCaseStudyModal);

  window.addEventListener("keydown", (e) => {
    const modal = document.getElementById("caseStudyModal");
    if (e.key === "Escape" && modal && modal.classList.contains("open")) {
      closeCaseStudyModal();
    }
  });
}

// ==========================================
// 8. CASE STUDY TABS (FACTIFY)
// ==========================================
function initCaseStudyTabs() {
  const tabBtns = document.querySelectorAll(".case-nav-btn");
  const tabPanels = document.querySelectorAll(".case-panel");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab");

      tabBtns.forEach(b => b.classList.remove("active"));
      tabPanels.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const targetPanel = document.getElementById(`tab-${targetTab}`);
      if (targetPanel) {
        targetPanel.classList.add("active");
      }
    });
  });
}

// ==========================================
// 9. PROFESSIONAL INQUIRY FORM
// ==========================================
function initContactForm() {
  const form = document.getElementById("projectInquiryForm");
  const emailBtn = document.getElementById("emailDraftBtn");

  if (!form) return;

  // WhatsApp Submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("clientName").value.trim();
    const service = document.getElementById("serviceSelect").value;
    const details = document.getElementById("projectDetails").value.trim();

    const message = `👋 Hello Maaz,\n\nMy name is ${name}.\n\n🎯 *Service Requirement:* ${service}\n\n📝 *Project Overview:* ${details || "I would like to discuss our content requirements and next steps."}\n\nLooking forward to speaking with you.`;

    const waUrl = `https://wa.me/${CONFIG.PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  });

  // Direct Email Dispatch
  if (emailBtn) {
    emailBtn.addEventListener("click", () => {
      const name = document.getElementById("clientName").value.trim() || "Prospective Client";
      const service = document.getElementById("serviceSelect").value;
      const details = document.getElementById("projectDetails").value.trim();

      const subject = `Project Inquiry: ${service} — ${name}`;
      const body = `Hello Maaz,\n\nMy name is ${name}.\n\nService requirement:\n${service}\n\nProject details:\n${details || "We are interested in discussing our monthly content strategy and production."}\n\nBest regards,\n${name}`;

      const mailtoUrl = `mailto:${CONFIG.EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
    });
  }
}
