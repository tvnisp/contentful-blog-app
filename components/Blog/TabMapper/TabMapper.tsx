import React, { useMemo } from "react";
import { Grid, Card } from "@contentful/f36-components";
import BlogCard from "../Cards/BlogCard";
import BlogDraftCard from "../Cards/BlogDraftCard";

type TMenuTabs = 'main' | 'draft';

interface TabMapperProps {
  blogs: any;
  fetchBlogs: any;
  selectedTab: TMenuTabs;
  order: 'ascending' | 'descending';
}

function TabMapper({ blogs, fetchBlogs, selectedTab, order }: TabMapperProps) {
  const sortedBlogs = useMemo(() => {
    return (
      blogs?.items
        .filter((blog: any) => {
          if (selectedTab === 'main') {
            return blog.isPublished() && 'createdAt' in blog.sys;
          }
          if (selectedTab === 'draft') {
            return blog.isDraft() && 'createdAt' in blog.sys;
          }
          return false;
        })
        .sort((a: any, b: any) => {
          const dateA = new Date(a.sys.createdAt!);
          const dateB = new Date(b.sys.createdAt!);
          return order === 'descending' ? dateB - dateA : dateA - dateB;
        })
    );
  }, [blogs, order, selectedTab]);

  return (
    <>
      {selectedTab === 'main' ? (
        <Grid columns={3} rowGap="spacingL">
          {sortedBlogs?.map((blog: any) => (
            <BlogCard fetchBlogs={fetchBlogs} key={blog.sys.id} {...blog} />
          ))}
        </Grid>
      ) : selectedTab === 'draft' ? (
        <>
          {sortedBlogs?.map((blog: any, index: number) => (
            <Card key={index}>
              <BlogDraftCard
                fetchBlogs={fetchBlogs}
                id={blog.sys.id}
                slug={blog.fields.slug['en-US']}
              />
            </Card>
          ))}
        </>
      ) : null}
    </>
  );
}

export default TabMapper;
