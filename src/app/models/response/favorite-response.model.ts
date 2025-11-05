import { ItemTypeEnum } from '../item-type-enum';
import { GrammarTopic } from '../grammar/grammar-topic.model';
import { ListeningTopic } from '../listening/listening-topic.model';
import { VocabTopic } from '../vocabulary/vocab-topic.model';

export interface FavoriteResponse {
  id: string;
  itemType: ItemTypeEnum;
  addedAt: string;
  grammarTopic: GrammarTopic;
  listeningTopic: ListeningTopic;
  vocabTopic: VocabTopic;
}
