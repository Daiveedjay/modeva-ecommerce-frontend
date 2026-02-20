import CollectionGallery from "@/app/_sections/modeva-collections-section/collection-gallery";

export default function ModevaCollections() {
  return (
    <div className="px-4 md:px-14">
      <div className="space-y-4">
        <h2 className="section_header">
          <span>MODEVA</span> <br />
          <span>COLLECTIONS</span> <br />
          <span>25-26</span>
        </h2>
      </div>
      <CollectionGallery />
    </div>
  );
}
