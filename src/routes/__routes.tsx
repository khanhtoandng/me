import { Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { t } from "i18next";
import ContactPage from "@/pages/website/ContactPage";

// common
const NotFoundPage = React.lazy(() => import("@/pages/common/NotFoundPage"));

// website
const HomePage = React.lazy(() => import("@/pages/website/HomePage"));
const ProjectsPage = React.lazy(() => import("@/pages/website/ProjectsPage"));

const WorkPage = React.lazy(() => import("@/pages/website/WorkPage"));
const PostPage = React.lazy(() => import("@/pages/website/PostsPage"));

const AppRoutes: React.FC = () => {
  const LoadingFallback = () => (
    <motion.div
      className="flex h-screen items-center justify-center bg-[var(--background)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-base">
        <Button
          isLoading={true}
          className="flex cursor-text gap-0 border-none bg-transparent"
        >
          {t("Public.Loading")}
        </Button>
      </div>
    </motion.div>
  );

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/posts" element={<PostPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* </Route> */}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
