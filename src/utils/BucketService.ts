import { XMLParser } from 'fast-xml-parser';

interface BucketContent {
  ETag: string;
  Key: string;
  LastModified: string;
  Size: number;
  StorageClass: string;
  Type: string;
}

export default class BucketService {
  private xmlParser = new XMLParser();

  constructor() {}

  public async bucketContents(prefix: string): Promise<BucketContent[]> {
    const bucketRequest = await fetch(
      `${import.meta.env.VITE_DIGITAL_OCEAN_SPACES_ENDPOINT}?list-type=2&prefix=${prefix}`,
    );
    const responseText = await bucketRequest.text();
    const parsedResponse = this.xmlParser.parse(responseText);
    return parsedResponse.ListBucketResult.Contents.filter(
      (content: BucketContent) => content.Key !== prefix,
    );
  }
}
