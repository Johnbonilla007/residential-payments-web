import React from "react";
import styled, { keyframes } from "styled-components";
import { Button } from "primereact/button";
import PageState from "../PageState";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ItemShell = styled.div`
  display: flex;
  align-items: center;
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--app-shadow-sm);
  overflow: hidden;
  min-height: 60px;
`;

const ItemTrigger = styled.button`
  flex: 1 1 auto;
  min-width: 0;
  min-height: 60px;
  padding: 10px 12px;
  background: transparent;
  border: none;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
  cursor: ${(props) => (props.$clickable ? "pointer" : "default")};

  &:focus-visible {
    outline: none;
    box-shadow: inset var(--focus-ring);
  }
`;

const LeadingBox = styled.div`
  flex: 0 0 auto;
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  font-weight: 700;
  background: ${(props) => {
    switch (props.$tone) {
      case "danger":
        return "var(--app-error-soft)";
      case "success":
        return "var(--app-success-soft)";
      case "warning":
        return "color-mix(in srgb, var(--app-warning) 18%, var(--surface-card))";
      default:
        return "var(--highlight-bg)";
    }
  }};
  color: ${(props) => {
    switch (props.$tone) {
      case "danger":
        return "var(--app-error)";
      case "success":
        return "var(--app-success)";
      case "warning":
        return "var(--app-warning)";
      default:
        return "var(--highlight-text-color)";
    }
  }};
`;

const ContentCol = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const ItemTitle = styled.div`
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-color);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ItemSubtitle = styled.div`
  font-size: 0.8125rem;
  color: var(--text-color-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TrailingCol = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  text-align: right;
`;

const TrailingText = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-color);
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${(props) => {
    switch (props.$variant) {
      case "danger":
        return "var(--app-error-soft)";
      case "success":
        return "var(--app-success-soft)";
      case "warning":
        return "color-mix(in srgb, var(--app-warning) 18%, var(--surface-card))";
      default:
        return "var(--surface-hover)";
    }
  }};
  color: ${(props) => {
    switch (props.$variant) {
      case "danger":
        return "var(--app-error)";
      case "success":
        return "var(--app-success)";
      case "warning":
        return "var(--app-warning)";
      default:
        return "var(--text-color-secondary)";
    }
  }};
`;

const MoreButton = styled.button`
  flex: 0 0 auto;
  min-width: 44px;
  min-height: 60px;
  border: none;
  border-left: 1px solid var(--surface-border);
  background: transparent;
  color: var(--text-color-secondary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:focus-visible {
    outline: none;
    box-shadow: inset var(--focus-ring);
  }
`;

const shimmer = keyframes`
  0%, 100% { opacity: 0.55; }
  50% { opacity: 1; }
`;

const SkeletonCard = styled.div`
  height: 64px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--surface-border);
  background: var(--surface-card);
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  animation: ${shimmer} 1.4s ease-in-out infinite;
`;

const SkeletonCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  background: var(--surface-hover);
  flex-shrink: 0;
`;

const SkeletonLines = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const SkeletonBar = styled.div`
  height: 12px;
  width: ${(props) => props.$w || "60%"};
  border-radius: 6px;
  background: var(--surface-hover);
`;

export const MobileListSkeleton = ({ rows = 6 }) => (
  <ListContainer aria-busy="true" aria-label="Cargando lista">
    {Array.from({ length: rows }).map((_, index) => (
      <SkeletonCard key={index}>
        <SkeletonCircle />
        <SkeletonLines>
          <SkeletonBar $w="55%" />
          <SkeletonBar $w="38%" />
        </SkeletonLines>
        <SkeletonBar $w="52px" />
      </SkeletonCard>
    ))}
  </ListContainer>
);

export const MobileListItem = ({
  leading,
  title,
  subtitle,
  trailing,
  status,
  chevron = false,
  onClick,
  onMore,
  moreLabel = "Más acciones",
}) => {
  const renderLeading = () => {
    if (!leading) return null;
    if (React.isValidElement(leading)) return leading;
    const tone = leading.tone || "primary";
    if (leading.icon) {
      return (
        <LeadingBox $tone={tone} aria-hidden="true">
          <i className={leading.icon} />
        </LeadingBox>
      );
    }
    if (leading.initials) {
      return (
        <LeadingBox $tone={tone} aria-hidden="true">
          {leading.initials}
        </LeadingBox>
      );
    }
    return null;
  };

  return (
    <ItemShell>
      <ItemTrigger
        type="button"
        onClick={onClick}
        $clickable={Boolean(onClick)}
      >
        {renderLeading()}
        <ContentCol>
          <ItemTitle>{title}</ItemTitle>
          {subtitle && <ItemSubtitle>{subtitle}</ItemSubtitle>}
        </ContentCol>
        {(trailing || status || chevron) && (
          <TrailingCol>
            {trailing && <TrailingText>{trailing}</TrailingText>}
            {status && (
              <StatusBadge $variant={status.variant}>
                {status.icon && <i className={status.icon} aria-hidden="true" />}
                <span>{status.label}</span>
              </StatusBadge>
            )}
            {chevron && !trailing && !status && (
              <i
                className="pi pi-chevron-right"
                style={{ color: "var(--text-color-secondary)" }}
                aria-hidden="true"
              />
            )}
          </TrailingCol>
        )}
      </ItemTrigger>
      {onMore && (
        <MoreButton
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onMore(e);
          }}
          aria-label={moreLabel}
        >
          <i className="pi pi-ellipsis-v" aria-hidden="true" />
        </MoreButton>
      )}
    </ItemShell>
  );
};

export const MobileList = ({
  loading = false,
  skeletonRows = 6,
  empty,
  hasMore = false,
  onLoadMore,
  loadingMore = false,
  loadMoreLabel = "Cargar más",
  children,
}) => {
  if (loading) {
    return <MobileListSkeleton rows={skeletonRows} />;
  }

  const count = React.Children.count(children);
  if (count === 0 && empty) {
    return <PageState {...empty} />;
  }

  return (
    <ListContainer>
      {children}
      {hasMore && onLoadMore && (
        <Button
          type="button"
          label={loadMoreLabel}
          loading={loadingMore}
          onClick={onLoadMore}
          className="p-button-outlined"
          style={{ width: "100%", minHeight: "44px", marginTop: "4px" }}
        />
      )}
    </ListContainer>
  );
};

export default MobileList;
